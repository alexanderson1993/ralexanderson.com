---
title: "Subscription-Only GraphQL Data"
excerpt: For subscriptions, how can you fetch initial data and subscribe to changes at the same time?
featureImage:
  src: "/assets/blog/subscription-graphql.jpg"
publishDate: 2020-02-04
---

There are three operations you can perform with GraphQL: Mutations, Queries, and Subscriptions. Mutations are designed solely for performing updates or changes to server-side data. Queries and Subscriptions, on the other hand, are focused on requesting and retrieving data. The question is: why are there two separate operations focused on getting data?

# Queries vs Subscriptions

There are a number of differences between queries and subscriptions.

- Queries purposes are to fetch initial or current data; subscription data is sent whenever the server triggers a subscription publish, perhaps in response to a mutation.
- Queries are made over HTTP; subscriptions are made over WebSockets.
- Queries only return data when the client requests it; subscriptions can get data at arbitrary times as long as the connection is open.

That's pretty much all of the differences; there aren't that many, especially considering the similarities:

- Both allow you to specify the shape of the data you want to get back.
- Both let you specify variables which can filter and specify the data you want to get back.
- If you are using Apollo, you have to set up links for both individually, but the configuration is well documented.

All in all, the biggest difference between the two is when you get the data back: at the time of the request, or sometime after the request.

# Subscriptions As Queries

Does your app have a lot of real-time data? Do your queries and subscriptions return basically the same data? Wouldn't it be nice if you only had to make one request to get both the initial data and the subscription updates?

Well good news! This is actually possible to do in Apollo Server. Lets walk through a typical Subscription resolver and then change it so it returns initial data when a subscriber first connects.

Here's the subscription resolver which Apollo uses for the example in their docs:

```javascript
const POST_ADDED = "POST_ADDED";

const resolvers = {
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
  },
  Query: {
    posts(root, args, context) {
      return postController.posts();
    },
  },
  Mutation: {
    addPost(root, args, context) {
      pubsub.publish(POST_ADDED, { postAdded: args });
      return postController.addPost(args);
    },
  },
};
```

The first thing we need to do is modify our subscription so it returns the same data as the query. That also means we need to update calls to `pubsub.publish(POST_ADDED,...`) so they return all of the data.

```javascript
const POST_ADDED = "POST_ADDED";

const resolvers = {
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
  },
  Query: {
    posts(root, args, context) {
      return postController.posts();
    },
  },
  Mutation: {
    addPost(root, args, context) {
      const post = postController.addPost(args);
      pubsub.publish(POST_ADDED, { postAdded: postController.posts() });
      return post;
    },
  },
};
```

Now we modify our subscribe function. This function is run whenever a new client subscribes to our subscription. We have to return the `pubsub.asyncIterator` instance, but we can also perform some actions before returning it. What if we were to call `pubsub.publish` in that function?

```javascript
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => {
        pubsub.publish(POST_ADDED, { postAdded: postController.posts() });
        return pubsub.asyncIterator([POST_ADDED]);
      },
    },
  },
```

Classy, except there is a problem: the call to `pubsub.publish` doesn't do anything, because when it happens, our async iterator hasn't subscribed to the publish yet. We have to run it after the async iterator is instantiated. This is easy in Node, just run it on the next tick.

```javascript
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => {
        process.nextTick(() => {
          pubsub.publish(POST_ADDED, { postAdded: postController.posts() });
        });
        return pubsub.asyncIterator([POST_ADDED]);
      },
    },
  },
```

You could also use `setImmediate`, but this works well enough.

There's still another problem - we are getting data when our client subscribes, but we also are getting other data whenever other clients subscribe. This isn't a huge problem if we aren't using arguments, but suppose we are querying a specific set of posts and have arguments in our subscription. Another client might subscribe with different arguments, but the publish would go out to all the clients with the erroneous data. We need a way to isolate this call to `pubsub.publish` to only the subscribing client.

This is actually not hard to do. We already have that client's async iterator in the same scope as our `pubsub.publish`, so we should be able to set up a token to specifically target that client.

```javascript
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: (rootQuery, {postTag}) => {
        const id = uuid.v4();
        process.nextTick(() => {
          pubsub.publish(id, { postAdded: postController.posts({tag:postTag}) });
        });
        return pubsub.asyncIterator([id, POST_ADDED]);
      },
    },
  },
```

Now, instead of publishing to the global `POST_ADDED` token, we can publish to the unique ID created for each client. That makes it so that client only gets the data that it should for it's first subscription. Bonus: none of our other clients will get extraneous data when a new client connects.

Now, instead of needing to perform a query AND start a subscription, we can just start the subscription and get our data right away:

```javascript
const POST_SUB = gql`
subscription PostSubscription($postTag:String) {
  postAdded(postTag:$postTag) {
    author
    comment
    tag
  }
}
`
const MyDataComponent = ({postTag}) => {
  const {data, loading} = useSubscription(POST_SUB, {variables: {postTag}});
  ...
}
```

One line to get the initial data and any changes - music to my ears!
