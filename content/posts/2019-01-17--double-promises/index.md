---
title: "Double Promises"
author: "Alex Anderson"
category: "JavaScript"
cover: hero.jpeg
date: 2019-01-17
---

![Hero](hero.jpeg)

We all know that a Promise in JavaScript is a way to perform tasks or get data asynchronously. That is, the promise will do its thing in the background and respond once some condition is met. That condition could be a network request coming back, or some long running process completing, or some other arbitrary thing. All that matters is that our promise will resolve... later.

Here's an example - say I have a promise that resolves after exactly two seconds using `setTimeout`:

```javascript
new Promise(resolve => setTimeout(() => resolve("Hi there"), 2000));
```

I can get at the results of the promise with `.then`

```javascript
new Promise(resolve => setTimeout(() => resolve("Hi there"), 2000)).then(result =>
  console.log(`${result}, Person A`)
); // "Hi there, Person A"
```

That's cool! What if I put the promise into a variable? Does it work then?

```javascript
const myPromise = new Promise(resolve => setTimeout(() => resolve("Hi there"), 2000));
myPromise.then(result => console.log(`${result}, Person A`)); // "Hi there, Person A"
```

Nifty!

But hang on a second. What if I put more than one `.then` after the promise:

```javascript
const myPromise = new Promise(resolve => setTimeout(() => resolve("Hi there"), 2000));
myPromise.then(result => console.log(`${result}, Person A`)); // "Hi there, Person A"
myPromise.then(result => console.log(`${result}, Person B`)); // "Hi there, Person B"
```

Yep. It works exactly the same way for both `.then` statements. Once the promise resolves after two seconds, it executes both of the `.then` statements in the order that they were called in. I'm not entirely clear on why it behaves this way, but it does almost seem like an event emitter of sorts, where I can put any kind of resolution handler on the promise and all of them execute. Pretty cool!

It even works with async/await!

```javascript
async function sayHello() {
  const myPromise = new Promise(resolve => setTimeout(() => resolve("Hi there"), 2000));
  console.log(`${await myPromise} Person A`);
  console.log(`${await myPromise} Person B`);
}
```
