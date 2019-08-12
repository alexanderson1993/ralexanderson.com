---
title: "jQuery For React Developers"
author: "Alex Anderson"
category: "Programming"
cover: hero.jpg
date: 2019-08-08
---

![Hero](hero.jpg)

You're at your first real job after coding bootcamp. You've made it! You are a front-end React developer! Your knowledge and expertise is growing, and you are feeling great.

Then one of your coworkers comes up to you. "Hey!" he says, "have you heard of jQuery?" You shrug, to which he responds "It's awesome man, way better than React. Want to know what everyone will be coding in 5 years? jQuery."

As he walks away, you get nervous. You quickly open up your browser and search for jQuery. Finding yourself lost in all of the `$` and `.ajax()` and jQuery UI stuff, you decide you need another approach. You search "jQuery for React Developers". You find this article. You browse through it, finally discovering a simple, straightforward way to bridge your current knowledge with the future.

---

_Before I get too far, I want to point out that this is a satirical post, and not intended to be actual advice or a slight against jQuery or React. jQuery is a great tool and has a huge influence on the current state of Web Development; same with React. The footnotes all rebut the criticisms I have for React. There's a couple of things that I learned from them as I made this blog post, and maybe you will too._

---

Much like React, jQuery is designed to make your life as a JavaScript developer easier. Why would you want to use jQuery instead of React? Is it really the future?

Lets start with the similarities:

- jQuery and React are both libraries that you can pull in from CDNs or bundle with your app.
- jQuery and React both create abstractions over DOM APIs. This creates a uniform API surface and improves cross-browser compatibility.

That's about all I can think of.

How about the differences?

# Ease of Installation

React is way more complicated to get set up. You have to install the libraries using NPM, set up a transpiler and bundler so you can use JSX, add build steps, and a whole bunch of other complicated stuff<sup>1</sup>. With jQuery, all you have to do is load the script from the provided CDN:

```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
```

That's it. You can now use jQuery on your website.

# Ease of Use

Lets make a simple example: a counter. With React, you have to create a root in your HTML file, and then render a component to that root.

```html
<div id="root"></div>
```

```javascript
import React from "react"
import ReactDOM from "react-dom"

const App = () => {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count => count + 1)}>-</button>
      <button onClick={() => setCount(count => count - 1)}>+</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
```

Wow. That's a lot just to add a number and some buttons to a page!

Lets see how much simpler this is with jQuery.

First we create our HTML. Instead of doing it in JavaScript (whoever thought _that_ was a good idea? What next, using JavaScript to write CSS?), we'll put our HTML in an HTML file, where it belongs:

```html
<div>
  <div id="counter">0</div>
  <button id="minus">-</button>
  <button id="plus">+</button>
</div>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="script.js"></script>
```

Then, we'll add some event handlers in our JavaScript file with the good ol' `$` handler.

```javascript
function getCount() {
  return parseInt($('counter').text(),10);
}
$('#minus').click(() => {
  $('counter').html(getCount() - 1);
})
$('#plus').click(() => {
  $('counter').html(getCount() + 1);
})
```

And that's all there is to it! Lets look at the benefits of jQuery:

- No need to render - that's all taken care of by HTML and the browser.
- Our state isn't stored in some magic behind-the-scenes React state bucket. It's right there on the DOM! We're literally manipulating our state directly, which is obviously superior. If we wanted, we could store our state in a global variable<sup>2</sup>, which makes it even more easy to access.
- We have real separation of concerns, with the HTML and JavaScript totally separate from each other, the way Tim and Brendan intended<sup>3</sup>.

# Using React in jQuery

One sure-fire way to know which is superior: Can you use jQuery in React? And can you use React in jQuery?

The answer is yes. Yes you can. You just have to be careful in both cases. But why would you ever want to do that when you can just make your whole website with jQuery?

# Virtual DOM

One thing which React employs to "be fast" (Read: Make up for all of the performance problems that it introduces.)<sup>4</sup> is the _virtual DOM_. What is this? It's basically the same thing as what the browser already provides for you, expect entirely in JavaScript. Why create a whole new virtual DOM when you can just use the DOM which is already provided<sup>5</sup>? I mean, that's what the browser gave you. That's what jQuery does, and it works great! Instead of thrashing the entire DOM whenever you add a single character to an input, just surgically  Use the Platform™!

# Direct Manipulation

As you saw in the above example, you can easily access DOM nodes directly to do whatever you want with them. In React, to access a DOM node, you have to attach a ref to it, and then mess around with `myRef.current` business. Weird<sup>6</sup>.

# Conclusion

Obviously, jQuery is superior to React. It's faster, closer to the metal, has all of the benefits and none of the drawbacks. So what are you waiting for?

---
<small><sup>1</sup> You can actually use React from script tags the same way that you do with jQuery. There are more hoops to jump through than with jQuery to use JSX and other fancy features, but those are easily solved - [this course](https://egghead.io/courses/the-beginner-s-guide-to-react) by Kent C Dodds explains it all. Plus, tools like Create React App and CodeSandbox make developing in React really easy to start.</small>
<small><sup>2</sup> Don't do this. Be ever so careful when storing state in a global variable. You'll come to regret it if you do it wrong.</small>
<small><sup>3</sup> Separation of concerns means [something different](https://twitter.com/mxstbr/status/993455977008594944) when working in a component mindset.</small>
<small><sup>4</sup> React actually adds an incredibly small amount of overhead to the browser. Any performance problem you create with React can be created in any other language, and most performance problems people talk about are FUD (fear, uncertainty, and doubt).</small>
<small><sup>5</sup> The DOM is actually really slow to read and write, especially when working with lots of elements. That's why the Virtual DOM exists. By creating an in-memory DOM representation, you can make all the changes that are necessary and then surgically mirror those changes over to the actual DOM. The virtual DOM doesn't make up for performance problems in React; it makes up for performance problems in the browser.</small>
<small><sup>6</sup> This is true, but it leaves out a lot. React is mostly declarative in nature, so directly accessing DOM nodes is an anti-pattern in most cases. However, since there are cases where you would want to do this (for render-agnostic animations, for example), React gives you an escape hatch that lets you operate imperatively. Refs are one of those. Also, the weird `myRef.current` syntax is to make sure the ref's variable object reference doesn't change when you set it to something different, to improve performance.</small>
