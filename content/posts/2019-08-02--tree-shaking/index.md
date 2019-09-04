---
title: "Tree Shaking"
author: "Alex Anderson"
category: "Devops"
cover: hero.jpg
date: 2019-08-02
subtext: "This is a post in a series about code projects, open source, build tools, and deployment."
---

![Hero](hero.jpg)

Modern JavaScript development is awesome! You can go to NPM (or another [package repository](https://github.com/features/package-registry)) and get code that someone else has written and load it into your application without having to copy/paste or write it yourself. One great example is [Lodash](https://lodash.com/), a package that bills itself as

> A modern JavaScript utility library delivering modularity, performance, and extras.

With Lodash, I have tools for arrays, objects, functions, and promises. I can throttle, debounce, map, sort, flatten, union, zip, and more! Think of the benefits of using this over writing my own utilities:

- It is battle tested, since many other people are using it
- It has unit and integration tests
- It handles edge cases
- It is largely faster than naïve implementations

There's only one problem.

# IT'S HUGE!

[Bundlephobia](https://bundlephobia.com/result?p=lodash@4.17.15) says the current version is 69.2kB minified. That might not seem like a lot ([React-DOM](https://bundlephobia.com/result?p=react-dom@16.8.6) weighs in at 103.7kB), but if I'm only using a single measly function I dont' want to be pulling in the whole bundle.

Enter Tree Shaking.

## What is Tree Shaking?

The purpose of tree shaking is removing modules from packages that aren't being included in your app. The idea behind the term is that a package has its individual exports which have their own files they depend on, fanning out in tree structure. If I only need one of those exports, I can _shake up_ the tree to remove the branches that aren't necessary<sup>1</sup>. This is also called dead code elimination.

So, instead of grabbing the whole lodash package, I only grab the `debounce` package, which only costs 1kB, saving me 22.7kB.

Let's see how this is done.

## Tree Shaking in Practice

Suppose I have an app that throttles the number of times I click, so it only increments a counter once every 500 milliseconds:

```javascript
import React from "react"
import ReactDOM from "react-dom"
import { throttle } from "lodash"

const App = () => {
  const [count, setCount] = React.useState(0)

  const throttleSetCount = React.useCallback(
    throttle(() => {
      setCount(count => count + 1)
    }, 500),
    []
  )
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={throttleSetCount}>Add One</button>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("root"))
```

For such simple functionality, I've added at least 21kB to my app! Lets fix this by selectively importing just the function that we need.

```javascript
import React from "react"
import ReactDOM from "react-dom"
import throttle from "lodash/throttle"
```

Now, instead of pulling in the whole library, it only pulls in the parts that are necessary for it to function, nothing more.

You can also tree-shake your app's code, but it takes a bit of manual work. There's a [guide for doing this with Webpack.]

## Limitations

Tree shaking is great, but it doesn't automatically work. There are a couple of conditions that must be met:

- You have to be using the new ES6 `import/export` syntax. Tree shaking doesn't work with CommonJS modules, like `require()`
- This only works with packages that are configured to use it. It works great with lodash; your [milage may vary with THREE.js](https://discourse.threejs.org/t/tree-shaking-three-js/1349)
- Modules with side-effects might accidentally be removed, which can cause errors for your app.

Regardless, this can be a really handy way of keeping your bundle size down, which in turn decreases the time to parse your JavaScript. That makes for a faster app and a happier user!

---

<small><sup>1</sup> I suppose the term "prune" was already being used somewhere else.</small>
