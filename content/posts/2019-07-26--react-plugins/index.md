---
title: "React Plugins"
author: "Alex Anderson"
category: "React"
cover: hero.jpg
date: 2019-07-26
---

![Hero](hero.jpg)

React can do some really wild stuff. In this post, I'll demonstrate loading remote React components and how that can be (ab)used to create a plugin system for a desktop-based React app. This post will blend a bit of React, some [build tools](/blog/javascript-build-tools), Electron, and a bit of experimenting. By the end, you'll know what it is, how to do it, and some of the pitfalls that you might find.

One of the cooler features is [`React.lazy`](https://reactjs.org/docs/code-splitting.html#reactlazy). This allows you to easily code-split your app using a bundler like Webpack or Parcel. Why code split? I should probably write a blog post about it (I did give a [talk](https://alexanderson1993.github.io/react-lazy-presentation/) on it), but here's a quick summary.

The bundler looks for signifiers like the [dynamic `import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). The bundler pulls that file and any dependent files out into their own bundle. Those files then don't have to be loaded by a client web browser until they are needed (this is called lazy loading), which keeps the main bundle size small, allowing for fast loading.

React has to parse React components that are code-split into something that can be rendered. It uses the new [Suspense](https://reactjs.org/docs/react-api.html#reactsuspense) component to show a loading state while the remote file is being loaded, and then replaces it with the component once it's ready.

So how can we use this to load remote React components?

# Loading Remote Components

# Generating Component URLs in Electron

# Pitfalls

Bundling a React component separately from the main app can cause a lot of problems.

For one thing, you might be running [two different versions of React](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375). Differences in the API between the two versions could cause errors when you try to render your component.

Also, objects created in either of the bundles aren't accessible to one another. The most obvious example of this is React Context. I could access the 'same' context in both the main app and the remote component, but each bundle instantiates a different version of the context, so _you can't use context to send data from the main app to the remote component_. Instead, you have to rely on passing all of your data through props. If the remote component is large, you can create a new context provider which can grab the props and pass them down to the rest of the components.

Security is also something to consider. Loading and executing remote code is always risky, especially if you are doing it anywhere close to a Node context. Be careful employing this method and make sure you trust whatever plugins are provided.

I'm sure in my limited testing I've missed something. There might be more pitfalls you run into. If you do, I would love to hear about them. [Reach out and let me know.](https://twitter.com/ralex1993)

# So What?

There's a lot of weird stuff that you can do with React, and most of it isn't documented. Thats why it is up to you to explore. Do things that you shouldn't. Practice Wonder-Driven Development. Try things that you think shouldn't work, just to make sure you are right.

You might surprise yourself.
