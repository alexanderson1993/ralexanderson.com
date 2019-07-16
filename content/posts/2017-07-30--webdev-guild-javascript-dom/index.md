---
title: "The DOM"
author: "Alex Anderson"
layout: post
path: "/webdev-guild-javascript-dom/"
category: "Webdev Guild"
date: 2017-07-30
---

# The DOM

_This post was written for a [WebDev Guild](https://github.com/alexanderson1993/webdev-guild) requirement._

When a browser parses an HTML document, it takes the text from the HTML and turns it into a JavaScript Object. That object is a virtual representation of the HTML it parsed. It won't be _exactly_ like the HTML, rather it will be a representation which the browser can use to render the HTML to the screen.

## Document

The browser provides a `document` variable that allow you to access, read, and manipulate the DOM in JavaScript. `document` represents everything that the browser parsed from your HTML file. It also has some properties and methods which help when manipulating the DOM later on.

### _Try it out_

Open up your web browser to a blank page by going to [about:blank](about:blank). Then open up your web inspector or dev tools. You can typically do this by right clicking on the page and choosing "Inspect Element" from the drop down.

_If you don't see that, you might be using Safari and you need to turn on developer mode. Follow_ [this guide](https://developer.apple.com/library/content/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/GettingStarted/GettingStarted.html#//apple_ref/doc/uid/TP40007874-CH2-SW1) _to turn on developer mode._

Go to the 'Console' tab on your inspector. At the bottom, it gives you an area to type JavaScript commands. To make sure it is working type `"Hello"`. It should say "Hello" back. (It is a friendly console).

Now try typing the following:

```javascript
document.write("Hello world!");
```

That is a command that says '`document`, overwrite everything in the DOM and replace it with 'Hello world!' You should see that text in the browser.

Now type:

```javascript
document.write("<h1>This is a header</h1>");
```

When you write HTML in the `document.write` command, it parses the HTML and renders it to the page. You could technically use `document.write` to put an entire HTML file on the webpage, but it typically is just used for testing. Instead, we'll write to the DOM with special JavaScript Objects.

### `createElement` and `appendChild`

Let's create some HTML elements to put on the page. We can do that with a special method attached to `document` called `createElement`.

```js
var myDiv = document.createElement("div");
```

This creates a new `div` in the DOM and puts it in the variable. With that variable, you can change anything you want to about the div. Want to put text in it?

```js
myDiv.innerText = "🚀";
```

"Hang on," you might be saying, "Why don't I see that div on the page?" Good question. For the div to appear on the page, you have to put it on their yourself. Otherwise, it could just appear anywhere! To add it to the page, you have to append it to another DOM element with the `[element].appendChild` method. In HTML, there is one DOM element which contains all of the elements which are shown on the page: `<body>`. Same thing for the DOM. You can access the DOM `body` directly from the `document`:

```js
body.appendChild(myDiv);
```

And now the div should be showing up on the page!

A few things to consider here:

Since I still have a reference to the original `div` variable, I can change that `div` at any time and my changes will update in the browser automatically. In fact, I can add HTML to the inside of the `div` too! All I have to do is set the `innerHTML` property of the `div` to an HTML string.

```js
div.innerHTML = "<p>This is <strong>cool</strong>, no?</p>";
```

Just like with the `document.write`, the browser evaluates the HTML on the spot and sticks it in the displayed DOM where the `div` is. Nifty!

I can change any attribute of the `div`. However, some attributes have different names (because JavaScript has certain reserved keywords). Also, the syntax can be a little bit funky. An example of this is adding classes. You can't just say `div.class = "blah"`. Are you just going to overwrite all of the other classes? Are you going to add a class? How do you remove a class? There is a specific syntax for manipulating classes:

```js
div.classList.add("awesome"); // Adds the awesome class
div.classList.remove("awesome"); // Removes the awesome class
div.classList.contains("awesome"); // false - tells me if there is a class on `div` called 'awesome'
div.classList.toggle("awesome"); // Adds 'awesome' if it isn't there already; removes it if it is.
```

There are a lot of other methods, attributes and properties for manipulating the DOM. These are just the basics. There are a lot of resources out there, but the best learning is to do. Play around. Use the dev tools and see if you can find out how things work on your own. Do some Googling or check out the [extra learning](https://github.com/alexanderson1993/webdev-guild/blob/master/apprentice/javascript/dom.md#extra-learning) if you get stuck.

Best of luck to you!

Alex
