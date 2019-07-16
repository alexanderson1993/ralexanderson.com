---
title: "Async/Await Magic"
author: "Alex Anderson"
category: "JavaScript"
cover: hero.jpeg
date: 2019-05-21
---

![Hero](hero.jpeg)

I already wrote a lot about promises [in my earlier post on the basics](/blog/i-promise-youll-like-this/) and [another post on some weird tricks](/blog/promise-fu). You should probably read the first one at least before diving into this. Async/Await is based on Promises, so understanding how promises work will help you understand how Async/Await works and why it's helpful.

## What Makes Async Great?

Promises solve a really important problem - they make it possible to perform asynchronous operations without blocking the execution of other code. There's one problem is that this causes: Logically, we want our code to pretend like it is synchronous. When this thing is done, do this with the result. Promises make this possible, but it's a little clunky and wrapped in tons of boilerplate. Async/Await makes this look and operate much nicer.

This makes a lot of things easier too:

- Waiting for things in a `for` loop.
- Conditionals based on the results of an async operation.
- Combining the results of multiple async operations.

## The Structure of Async Functions

```javascript
async function doAsyncAction(num) {
  const doubledNum = await longDouble(num);

  console.log(`The doubled number plus two is ${doubledNum + 2}`);
}
```

As you can see, everything after the await can access the value of `doubledNum` just as if it were a regular variable. In fact, for the sake of this function, it is! You can do whatever you want with it, because after the `await`, the value is resolved.

All async functions must be declared as such. You can declare an async function in a number of ways.

```javascript
// Regular functions
async function myFunction() {}

// Arrow functions
const myFunction = async () => {};

// Class methods

class MyClass {
  async myFunction() {}
}
```

_Note:_ You _cannot_ use `await` outside of an async function.

_Another Note:_ All Async functions return promises, regardless of whether they use `await` inside of them or not. Make sure you are checking for that.

## Error Handling

Promises use `.catch()`. Async/Await functions use the exact same syntax as regular JavaScript: try/catch statements.

```javascript
async function maybeError() {
  try {
    await maybeError();
  } catch (error) {
    console.error("There was an error:", error);
  }
}
```

## A Practical Example

```javascript
async function getExample() {
  try {
    const websiteCode = await fetch("http://example.com").then(res => res.text());
  } catch (error) {
    console.error("Error getting website code:", error);
  }
  console.log("The website code is:", websiteCode);
}
```

Notice how I'm able to use the regular Promise syntax to get the text of the website. I could do that with two await statements, but logically it makes sense to keep them chained. It can also be helpful to handle errors using `.catch` statements instead of try/catch:

```javascript
async function getExample() {
  const websiteCode = await fetch("http://example.com")
    .then(res => res.text())
    .catch(error => console.error("Error getting website code:", error));

  console.log("The website code is:", websiteCode);
}
```

## Sequential Await

You can wait for one async operation before starting another one buy placing two awaits one after the other. This can let you pass the value of one async operation into the other:

```javascript
async function sequential() {
  const value1 = await asyncOperation1();
  const value2 = await asyncOperation2(value1);

  return value2;
}
```

## Concurrent Await

You can run multiple awaits at the same time if they don't rely on each other too. Just create a reference to the promise without adding `await`, and then add the `await` later. This runs both async functions at the same time, which can make the entire function evaluate much faster:

```javascript
async function concurrent() {
  const promise1 = asyncOperation1();
  const promise2 = asyncOperation2();

  const value1 = await value1;
  const value2 = await value2;

  console.log(value1, value2);
}
```

This is functionally equivalent to using `Promise.all`:

```javascript
async function concurrentPromise() {
  const [value1, value2] = Promise.all([asyncOperation1(), asyncOperation2()]);

  console.log(value1, value2);
}
```

In fact, you shouldn't be afraid of using the methods on the `Promise` object. They perform actions that are difficult or impossible to do without them.

## There's So Much More

I've only scratched the surface of what Async/Await functions can do. If you're interested in learning more, try out [this project from Free Code Camp](https://medium.freecodecamp.org/how-to-master-async-await-with-this-real-world-example-19107e7558ad). Enjoy!
