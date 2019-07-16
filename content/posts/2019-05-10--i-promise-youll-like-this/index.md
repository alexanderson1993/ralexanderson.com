---
title: "I Promise You'll Like This"
author: "Alex Anderson"
category: "JavaScript"
cover: hero.jpeg
date: 2019-05-10
---

![Hero](hero.jpeg)

I heard in a podcast recently that promises are a really scary thing for new developers. It's been a long time since I've had to learn promises, so I don't feel that scariness anymore, but I'm sure they seem daunting and weird. What are they for? When should I use them? When shouldn't I use them?

Hopefully I can answer some of these questions for you!

## Addressing and Sending Letters

Think of JavaScript as a person named Janet sitting at a desk. On one side of their desk, an inbox stores letters that need to be addressed. On the other side is an outbox that stores actions that have been addressed. Janet takes the items in the inbox, places the address label on them, and puts the letter in the outbox. Pretty easy to imagine, right?

Janet has a couple of limits though. They can only work on one letter at a time - no multitasking allowed. Also, with only one inbox and one outbox, Janet cannot address another letter from the inbox until the letter in their hands has its address and is placed into the outbox.

Obviously, if Janet has an action that might take a long time - say, for example, sometimes that have go down to accounting and ask Tony for the correct address for a letter, and Tony likes to chat. Every time Janet visits Tony, Janet will spend 10 minutes talking to him, which means for as long as Janet is chatting with Tony, she cannot address other letters! This slows him down, and could ruin things for the people that are expecting these letters.

Without some way of handling these long-running processes, like talking to Tony, Janet will get way behind on her work!

## Pneumatic Tubes

Janet goes to her boss and talks about Tony, and her boss decides to construct a Pneumatic tube system between Janet's desk and Tony's desk, like what they have at banks. This solves Janet's problem!

Here's how things change - if Janet gets a letter and needs to get the correct address, she'll put it into a capsule and send it through the pneumatic tubes to Tony. Once the tube is gone, Janet goes back to her inbox and keeps on addressing letters! Once Tony sends the address back, Janet can grab it, take care of it right away, and then continue on her work.

Janet and Tony also worked out a way for him to signal to her if the address doesn't exist of if he can't find it for some reason. He'll just send a red card back with the pneumatic tube with a message saying why he didn't send the address back.

And if Janet needs more information from Tony, she can just use the same pneumatic tube to send back instructions for what she needs to be done. She could chain these pneumatic tubes one after the other to take care of whatever she needs.

## What are Promises?

Just like Janet, JavaScript is what's called single-threaded. That means it can only do one thing at a time, with no ability to do two things at the same time. This is a problem if JavaScript wants to do something that might take a long time, like fetching data from the internet or reading a file from the filesystem.

A promise is like the pneumatic tube. You can send off an action that takes a long time to do, and while it's resolving, JavaScript will continue doing other things. Then when the promise resolves (or rejects, with an error), it can continue working with the results of the promise.

## What does it look like?

As a simple example, lets use the `fetch` API that comes with all web browsers:

```javascript
const myPromise = fetch("https://pokeapi.co/api/v2/pokemon/ditto/");

console.log(myPromise); // Promise {<pending>}

myPromise.then(response => console.log(response)); // Response {...}
```

The `fetch` API is really simple. Just put in the URL you want to fetch, and it returns a promise which resolves with the response.

You aren't able to get the results directly from the promise that is returned from `fetch`. You have to ask the promise to give you the response with the `.then()` method. When the promise resolves, it calls the function inside of `.then()` with the results of the promise. You can then do whatever you want with it.

In `fetch`s case, you can't get the actual text from the first response. You have to specify the format which you want the data in, like JSON data.

```javascript
const json = fetch("https://pokeapi.co/api/v2/pokemon/ditto/").then(res => res.json());

console.log(json); // Promise {<pending>}

json.then(res => console.log(res)); // {"abilities":[{"ability":{"name":"imposter"...
```

What's going on here? As it turns out, `res.json()` returns a promise, which allows you to chain another `.then()` onto the end of it. It's the second promise that gives us the JSON response that we can then mess around with.

## Handling Errors

What if there is a problem with the `fetch`? Like, if the network is disconnected? Well, promises can handle that too!

```javascript
const json = fetch("https://pokeapi.co/api/v2/pokemon/ditto/")
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(error => console.error(error)); // TypeError: Failed to fetch
```

The error variable can provide us with more information about why it failed, but at very least we can see that it failed and show a proper error message.

That's the basics of promises! There are a [lot more things to learn on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and be sure to watch this blog for an upcoming post about interesting or weird things you can do with promises.
