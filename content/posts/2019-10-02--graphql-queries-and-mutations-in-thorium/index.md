---
title: "GraphQL Queries, Subscriptions, and Mutations in Thorium"
author: "Alex Anderson"
category: "Thorium"
cover: hero.jpg
date: 2019-10-02
subtext: "This is a post in a series about Thorium stories, tricks, and techniques. Learn more at https://thoriumsim.com"
---

![Hero](hero.jpg)

[GraphQL](https://graphql.org) is a powerful new technology that makes it easy for client apps to query specific data from a server. The server provides a strongly-typed schema, which acts as a contract between the client and the server so they both know what data is available and what actions the API supports. The GraphQL specification even outlines how real-time subscriptions can be implemented.

[Thorium](https://thoriumsim.com) has used GraphQL since day one, sporting [Apollo](https://www.apollographql.com) Server and Client to handle hosting and requesting the GraphQL API. The way that Thorium does this is a little unique; I'll step through each operation (query for requesting data, mutation for changing data, subscription for getting updates), explaining what Thorium does.

If the post is too long for your liking, be sure to jump down to the last section for the lessons I've learned through this process.

# Query

Here's a simple query which tells me the alert level of the ship, 5 being nominal and 1 being red alert:

```graphql
query AlertLevel($simulatorId: ID) {
  simulators(simulatorId: $id) {
    id
    alertlevel
  }
}
```

Since nearly everything in Thorium is within the context of the spaceship simulator, most queries use a `simulatorId` argument to specify what specific simulator the query is referring to.

Most queries also return a list of objects, even if a single object was requested. The thinking was that for certain ship systems, like torpedo launchers, I might want to get back more than one. For whatever reason, that thinking made it's way into the rest of the query definitions.

What's going on at the server level when this query is run?

```javascript
const resolver = {
  Query: {
    simulators: (root, { simulatorId }) => {
      let returnVal = App.simulators
      if (simulatorId) returnVal = returnVal.filter(s => s.id === simulatorId)
      return returnVal
    },
  },
}
```

If you remember from [the post about state management](/blog/game-server-state-inmemory), all of Thorium's state is stored on a single `App` object. All that has to happen is optionally filtering that object to get any simulators that match the ID that was passed. Since the `alertlevel` value is directly on the simulator, no additional action is necessary.

in some cases, I have to include a custom resolver for properties on the simulator, like decks and rooms. Those objects are stored separately from the simulator, so I have to join them to the results of the simulator query:

```javascript
const resolver = {
  Simulator: {
    decks(simulator) {
      return App.decks.filter(d => d.simulatorId === simulator.id)
    },
    rooms(simulator) {
      return App.rooms.filter(r => r.simulatorId === simulator.id)
    },
    // ...
  },
}
```

In this case, I'm just filtering the list of decks and rooms by the ones that have the same `simulatorId` as the simulator that we just queried.

# Mutations

Mutations are much more interesting. Thorium is entirely event-driven. Instead of using a CRUD (create, read, update, delete) based mutation setup, mutations are modeled as discrete domain actions, and as such they map one-to-one with a corresponding event. That means I don't have to write any resolver for individual mutations - I just use a helper!

Here's how I define my mutations and generate the resolvers for them:

```javascript
const schema = gql`
  extend type Mutation {
    """
    Macro: Simulator: Change Alert Level
    """
    changeSimulatorAlertLevel(simulatorId: ID!, alertLevel: String!): String
  }
`

const resolver = {
  Mutation: mutationHelper(schema),
}
```

There are two interesting things going on here: the `mutationHelper` function and the macro definition.

## `mutationHelper`

The `mutationHelper` function grabs the schema that was generated, parses over the AST that was created by the `gql` tagged template function, and pulls out the names of all of the mutations. It then zips them all up into a single object that contains all of the mutation resolver functions.

These functions do two things:

1. They grab the args that were passed via GraphQL and trigger the event using the `App.handleEvent()` method.
2. They capture any results from that event triggering and return those results as the mutation response. This is done with the `cb` function that is passed as an argument to every event.

Not all events call the `cb` function, so it also has a timeout that calls it after a certain period of time.

Here's the whole helper function:

```javascript
import App from "../app"

export default function mutationHelper(schema, exceptions = []) {
  return schema.definitions
    .find(d => d.name.value === "Mutation")
    .fields.map(f => f.name.value)
    .filter(f => exceptions.indexOf(f) === -1)
    .reduce(
      (prev, eventName) => ({
        ...prev,
        [eventName]: (root, args, context) => {
          let timeout = null
          return new Promise(resolve => {
            App.handleEvent(
              {
                ...args,
                cb: (a, b, c) => {
                  clearTimeout(timeout)
                  resolve(a)
                },
              },
              eventName,
              context
            )
            timeout = setTimeout(() => resolve(), 500)
          })
        },
      }),
      {}
    )
}
```

## Macros

Let's see that schema definition again:

```graphql
extend type Mutation {
  """
  Macro: Simulator: Change Alert Level
  """
  changeSimulatorAlertLevel(simulatorId: ID!, alertLevel: String!): String
}
```

One of the best features of Thorium is macros. Macros allow specified mutations to be configured and called by end-users. This is used for a host of features, including automated triggers, software panels, and command line executions.

By adding these code comments to the schema definition, I can do an introspection query and find out which mutations support being called as a macro. Special React components then provide the UI for handling the configuration of the macro.

Here's the introspection query:

```graphql
query IntrospectionQuery {
  __schema {
    mutationType {
      name
      description
      fields {
        name
        description
        args {
          name
          description
          defaultValue
        }
      }
    }
  }
}
```

# Subscriptions

Subscriptions in Apollo GraphQL Server work by triggering a PubSub engine. By triggering a specific channel name, any clients subscribed to that channel will get the update.

Thorium doesn't have very specific channels - typically they are generic for an individual system of the simulator, or for the simulator object.

In Apollo server, you can do transformations to the return value with the `resolve` method and choose to not send a subscription update to a subscribed client using the `withFilter` HOC. Also, you provide an async iterator which is used to maintain the connection between subscribed clients and the PubSub engine.

This resolver isn't particularly sophisticated. In fact, it has a bug where legitimately returning an empty list of simulators would purposely not trigger the subscription.

```javascript
const resolver = {
  Subscription: {
    simulatorsUpdate: {
      resolve: payload => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator("simulatorsUpdate"),
        (payload, { simulatorId }) => {
          let returnVal = payload
          if (!returnVal) return false
          if (simulatorId)
            returnVal = returnVal.filter(s => s.id === simulatorId)
          return returnVal.length > 0 ? true : false
        }
      ),
    },
  },
}
```

On the client side, you have to merge the subscription results with the data you've already queried. Here's how I do it.

The `useQuery` hook provided by Apollo returns a `subscribeToMore` function which I can use to modify the query's results based on subscription data. I pull that out and pass it to a special `useSubscribeToMore` hook. I also pass that hook the subscription definition `SUB` and the config.

That config object is memoized to keep the component from continually re-rendering. It includes the subscription's variables (used to keep the component from getting unnecessary updates) and the `updateQuery` method which tells Apollo Client how to merge the new data into the old data.

```javascript
const Comp = ({ sim }) => {
  const { loading, data, subscribeToMore } = useQuery(QUERY, {
    variables: {
      id: sim.id,
    },
  })
  const config = React.useMemo(
    () => ({
      variables: { id: sim.id },
      updateQuery: (previousResult, { subscriptionData }) => {
        return Object.assign({}, previousResult, {
          simulators: subscriptionData.data.simulatorsUpdate,
        })
      },
    }),
    [sim.id]
  )
  useSubscribeToMore(subscribeToMore, SUB, config)

  //...
}
```

`useSubscribeToMore` isn't too fancy; it's just a wrapper around `useEffect`:

```javascript
function useSubscribeToMore(
  subscribeToMore,
  subscription,
  config,
  noSub = false
) {
  const s2m = React.useCallback(subscribeToMore, [])

  React.useEffect(() => {
    if (noSub) return () => {}
    const unsubscribe = s2m({ document: subscription, ...config })
    return () => unsubscribe()
  }, [config, noSub, s2m, subscription])
}
```

# How I would do this differently

I've learned a lot through this whole process. When Thorium development started in 2016, the only API Apollo Client provided was the `graphql()` HOC. That was a little clunky to use and required a lot of boilerplate code, especially for subscriptions. Then the component-based render props API was introduced, which made it easier to see what data was being used where, but there was still a lot of boilerplate. Hooks reduces the amount of boilerplate substantially.

However, I don't think the improvements have to cease there. I've recently been playing with [mst-gql](https://github.com/mobxjs/mst-gql) which uses [MobX State Tree](https://www.github.com/mobxjs/mobx-state-tree) to keep a cache of your data on the client. It also automatically generates models and GraphQL query, mutation, and subscription definitions (in TypeScript!), which make it really easy to query for data. Here's a simple test I did that substantially reduces the necessary code:

```javascript
const { loading, data, store } = useQuery(store => {
  return store.queryContacts(undefined, contact => contact.id.x.y)
})
React.useEffect(() => {
  const unsub = store.subscribeContactsUpdate(
    undefined,
    contact => contact.id.x.y
  )
  return unsub
}, [store])
```

Schema defintions are so important to get right. It's possible to deprecate and transition your schema, but it's better to get them right from the get go. Here's some ideas that I've had:

- Provide both singular and multiple queries for accessing objects. Eg. `simulator(id:$id)` vs `simulators(arg:$arg)`
- All mutations should be named using an "object-action" notation, such as `phaserCharge`, `phaserFire`, `phaserCool`. That groups objects together when the mutation list is sorted alphabetically.
- The mutation to event helper is kind of weird, especially the callback shenanagans. Using `cb` in event handlers should either be standardized or completely reworked. Probably the latter.
- Subscriptions should be much more granular, so subscription's aren't triggered for subscribers that don't care about that data. Subscriptions should be keyed to individual objects (as opposed to lists of objects) as often as possible.

I've learned a lot, but what I've made still works. It's been fun to sculpt this system over such a long period of time and as I've learned more.
