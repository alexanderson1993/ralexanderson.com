---
title: "Spreading Events in React with PubSub"
publishDate: 2019-09-11
excerpt: There's nothing wrong with using a bit of event firing to share state between React components.
featureImage:
  src: '/assets/blog/spreading-events-pubsub.jpg'
---

In React, when you have two components that depend on the same state, you have to lift that state into a common parent and then share the state to the children using either prop drilling or context. This is called [Lifting State Up](https://react.dev/learn/sharing-state-between-components)

Same goes for sending messages between two components. The "React" way is passing the state up to the parent using functions passed down as props (or via context), storing that state on the parent, and then passing it down to the other component.

Wouldn't it be nice if there were a way to tunnel between the two components?

Well good news! Since React is Just JavaScript™, you can easily send messages between the two!

Some methods are better than others. Using the `window` global, for example, is rife with potential problems. The solution I'm showing today isn't perfect either, but at least it provides a clean way to just send a message.

## PubSub

PubSub, short for Publish/Subscribe, is an architectural pattern which is used all over the place. The idea is that a subscriber listens for a specific type of message - the "topic" - and performs an action when it gets one. The publisher can send a message and specify what kind of subscriber should get it.

Here's a naïve implementation of a PubSub in JavaScript:

```javascript
import uuid from "uuid"

const topics = {}

export function subscribe(topic, fn) {
  if (!topics[topic]) topics[topic] = {}
  const id = uuid.v4()
  topics[topic][id] = fn
  return () => {
    topics[topic][id] = null
    delete topics[topic][id]
  }
}

export function publish(topic, args) {
  if (!topics[topic]) return
  Object.values(topics[topic]).forEach(fn => {
    if (fn) fn(args)
  })
}
```

The `uuid` package isn't totally necessary - it's just nice to

And you would use it like this:

```javascript
// In the subscriber file
import { subscribe } from "./pubsub"

const unsubscribe = subscribe("some-message", data => {
  console.log("Got some-message data:", data)
})

// In the publisher file
import { publish } from "./pubsub"

function doThePublish() {
  publish("some-message", { cool: true, awesomeNumber: 15 })
}
```

The data that I pass as the second argument of the publish is passed as the argument of the subscriber's callback.

Also, the subscribe function returns a function which is used to unsubscribe. This is especially important if you are using the subscriber in a React component, since you don't want to be calling that callback if the component has unmounted.

We can easily wrap our subscriber function in a `React.useEffect` hook to handle the unsubscribing for us.

```javascript
function MyComponent() {
  React.useEffect(() => {
    const unsubscribe = subscribe("some-message", data => {
      // Do Something Here
    })
    return unsubscribe
  }, [])

  // Return JSX down here
}
```

Now, if my other component wants to send a message, all it has to do it publish.

## Why?

Sometimes this is the easiest way to transmit the data. I used this in Thorium to highlight sensor contacts when you hover over a reference to that contact in a totally different component.

<video src="/assets/blog/pubsub.mp4" alt="Sensor Contact Highlight" muted autoplay></video>

Hoisting the state up to the most common parent would have been a huge hassle for such a small component, and it might have caused the entire tree to re-render. Instead, I can send the message directly between the two, cutting out the middle man and potentially improving overall performance.

## Pitfalls

The biggest problem with this approach is that it isn't very explicit, which means you might not know where publish topic are coming from. Since topics are global, and you can also have multiple subscribers attached to the same topic, you might cause unexpected behavior when you accidentally use duplicate topic names.

Overall, though, this system has worked really well. I'm careful about how I use it, and I try to document my topic names, so it's worked out really well. Sometimes it makes sense to bypass the "best practices" and just do what makes sense.
