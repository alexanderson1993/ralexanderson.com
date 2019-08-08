---
title: "JavaScript Start-up Optimization with Code Splitting"
author: "Alex Anderson"
category: "Devops"
cover: hero.jpg
date: 2019-08-02
---

![Hero](hero.jpg)

_This is a post in a series about code projects, open source, build tools, and deployment._

There are a number of performance considerations which web developers have to consider that were never a worry of traditional app developers. One of the biggest is bundle size. If you take a look at video games or mobile apps (I'm looking at you, Facebook<sup>1</sup>), the code being shipped is massive. But that's because bundle size isn't a huge constraint. The app is either shipped on a Blu-Ray, packed in a small cartridge, or downloaded once or infrequently from the internet<sup>2</sup>.

Not so on the web. Every single time someone visits a webpage, they are guaranteed to download something<sup>3</sup>. If they've already visited a website, chances are they've cached some of the resources, like JavaScript code, images, and other media. But if that JavaScript code has changed, they'll have to pay a visit to the ol' server to pick up the new version. That network round-trip is long and, depending on the type of website, costly. Users expect webpages to load and execute fast. Having a small JavaScript bundle can help.

# Performance Considerations

Earlier this year, Google released a [guide to different rendering methods](https://developers.google.com/web/updates/2019/02/rendering-on-the-web) that also described the different ways to measure website performance:

- **TTFB:** Time to First Byte - seen as the time between clicking a link and the first bit of content coming in.
- **FP:** First Paint - the first time any pixel gets becomes visible to the user.
- **FCP:** First Contentful Paint - the time when requested content (article body, etc) becomes visible.
- **TTI:** Time To Interactive - the time at which a page becomes interactive (events wired up, etc).

With the exception of _TTFB_, all of these are things that can be affected by JavaScript bundle size, especially if you are using a client-side framework like React or Vue. Why does JavaScript bundle size make such a huge difference?

- You have to download the entire JavaScript bundle which takes longer the larger the bundle is. This is a network-bound operation, which means the faster your network is, the less time it takes.
- Your browser has to parse the JavaScript file, which converts the JavaScript code into something the browser can execute. This is a CPU-bound operation, which means the faster your computer's processor is, the less time it takes.

Between these two, we've got bottlenecks on two fronts - Network and CPU. And what devices have those same bottlenecks?

Mobile devices.

Not only are they limited by the speed of their xG cellular connection, but their diminished size means their CPU isn't as powerful as desktop counterparts.

There are a lot of things that can make JavaScript bundles smaller and improve start-up performance. Google did [another article about this very topic](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/). The basics are to minify, compress, and cache. Check out their article for more details.

In this article, I'm going to talk about a more advanced technique called Code Splitting.

# What is Code Splitting?

If I've got an E-Commerce site, like Shopify, there are some things I definitely need to see on every page, like the header, nav menu, and footer links. On the other hand, I don't necessarily need to see the product carousel (because I might not be on a product page) or the checkout form (because I'm not checking out yet). Yet with a unified JavaScript codebase, I might have all of this code in my bundle unnecessarily.

Code Splitting lets you define code that isn't needed in the main bundle and split it out into it's own separate bundle. The main bundle contains a reference to the separate bundle along with code that will load that separate code when it is needed. Then, instead of having to download the product carousel code when I first visit the site, I only need to download that code when I visit a product page. The best part - that code is now cached, so if I navigate to another product page, the browser won't need to download that code again.

# How do I code split my app?

With traditional apps, code splitting was straightforward (albeit a little difficult). The JavaScript that is needed for a particular page is written in it's own JavaScript file and included in the HTML file for that page. The server made sure that only the JavaScript needed for a page was sent to the client.

In the brave new world of JavaScript tooling and client-side SPAs, our bundlers can do the work for us. The standard convention for code splitting a module is to use a static dynamic import. While that sounds like an oxymoron, it's just a [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports) called with a static string. Bundlers like Webpack and Parcel recognize this as a dynamic import and code split it into it's own bundle.

```javascript
// Included in the main bundle
import myModule from "./myModule"

// Split into it's own bundle
const myOtherModule = import("./myOtherModule")
```

To keep the other bundle from being loaded when your app first loads, just put it inside a conditional of some kind.

This leads to a couple of patterns which we can use for determining how to split our code. I'll be using React for these examples, but the principles apply across the board

# `React.lazy()`

To properly code-split in React, it has to be aware of the component that is being used is lazily loaded. To do that, you wrap the dynamic import in `React.lazy`<sup>4</sup>:

```javascript
const MyComp = React.lazy(() => import("./myComponent.js"))
```

When that component is rendered, it will fetch the bundle that contains the code that has been split.

Learn more about how to handle loading and error states for `React.lazy` in the [React docs](https://reactjs.org/docs/code-splitting.html).

# Route-based Code Splitting

With React Router (or just about any router package), we can lazy-load based on the route that the browser is on. This works because under the hood, all that router packages do is conditionally render components based on the current route. Literally all you need to do is change your component imports to dynamic imports and wrap it in `React.lazy`

The following example was taken from the React docs.

```javascript
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import React, { Suspense } from "react"

const Home = React.lazy(() => import("./routes/Home"))
const About = React.lazy(() => import("./routes/About"))

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
)
```

# Component Code Splitting

If we are doing conditional rendering ourselves, we can lazy-load based on whether a component has been loaded. Take a QR Scanner component. The module that processes a webcam input to determine the value of any QR codes is really large, about 126kB. Instead of loading that all at once, we can load it when the user needs it.

```javascript
import React from "react"
const QrScanner = React.lazy(() => import("./qrscanner"))

const ScanComponent = () => {
  const [showScanner, setShowScanner] = React.useState(false)

  return (
    <div>
      <button onClick={() => setShowScanner(true)}>Show Scanner</button>
      {showScanner && <QrScanner />}
    </div>
  )
}
```

# Module Code Splitting

When just code-splitting by module, you take advantage of the fact that dynamic imports return a promise. The results of the promise will be the module you want, so you load it only when you need it.

```javascript
const MyComponent = () => {
  const handleClick = async () => {
    const module = await import("./expensiveThing.js")
    module.doExpensiveThing()
  }

  return <button onClick={handleClick}>Do Expensive Thing</button>
}
```

# Vendor Code Splitting

You can also code-split based on modules that come from node_modules, putting each separate module into its own bundle, or bundling a few of them together. Each bundler has its own configuration for this kind of code splitting, so I'll let you refer to the documentation for your bundler of choice.

# Caching

One nice thing about code splitting is that if the module has already been loaded the dynamic import will grab it from the cache, keeping things quick. You can use this to pre-fetch modules based on heuristics, such as loading a page's component when the user moves their mouse over a link.

# Weighing Requirements

Code splitting can be a big help, but too much could also be a problem. For example, if you code split modules that are used on almost every page, you've just created an extra network request for your user. It might be better to just keep that module bundled with the main bundle.

Same for code splitting every single little module. Lots of network requests might make your users' experience worse.

And some applications don't need to be code-split at all. Online games and highly integrated apps might not find a lot of benefit from code splitting. It might be better for them to create a loading process as all of the assets and code are loaded when a user first visits the page.

# Conclusion

Code splitting is one way to keep websites fast, and with modern tools it's pretty easy to implement. Have you always wanted to but never gotten around to it? Give it a shot! Your users will thank you.

---

<small><sup>1</sup> Facebook Mobile clocks in at 447MB at the time of writing. Twitter on the other hand is 116MB. Loading the first page of [twitter.com](https://twitter.com) on the other hand is only 7.8MB.</small>

<small><sup>2</sup> That said, I know of many gamers who are incredibly frustrated when they go to play their AAA video game just to find it has "required updates" that will take hours to download. Bundle size is something everyone should think about.</small>

<small><sup>3</sup> We'll save the offline mode and Service Worker discussion for another blog post.</small>

<small><sup>4</sup> Note that `React.lazy` takes a function that returns a promise, and you can use any promise in there - not just dynamic imports. I actually abused this when creating a [React plugin system](/blog/react-plugins).</small>
