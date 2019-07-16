---
title: "Deep Updating Objects in ES6"
author: "Alex Anderson"
category: "JavaScript"
cover: hero.jpg
date: 2018-12-12
---

![Cover](hero.jpg)

Updating nested objects in JavaScript in an immutable used to be a pain. Heck, I don't even know that I ever did it. I would just manipulate the object in place:

```javascript
const obj = {
  innerKey1: {
    innerKey2: true
  }
};

obj.innerKey1.innerKey2 = false;
```

But what about if you are updating dynamic keys?

```javascript
function updateKey(obj, id, key, value) {
  obj[id][key] = value;
  return obj;
}
```

But what if `obj` isn't an Object? What if `key1` isn't a key of `obj`? It's definitely risky and could cause problems.

Wouldn't it be nice if we could update the nested value 1) dynamically, 2) safely (without risking `key is not a property of undefined` errors), and 3) immutably?

With ES6, it's pretty easy to do!

```javascript
function updateKey(obj = {}, id, key, value) {
  return { ...obj, [id]: { ...obj[id], [key]: value } };
}
```

It's even a one liner. Let's break this down.

I'm using three ES6 features to make this work properly:

[Default Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters), which is the `function(obj = {} ...)` makes it so even if nothing (or a [falsey](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value) is passed to that parameter, it will still have a default to fall back to. In this case, it's an empty object. This makes it so we can access properties, even if those properties are currently undefined.

[Object Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), which is the `{...obj}`. This feature allows me to spread out the contents of an object within another object literal, creating a brand new object. All of the properties of `obj` are present on the new object, along with any other properties I specify. This allows me to immutably create a new object with the updated keys.

Here are a few examples:

```javascript
// I can add keys afterward, and update existing keys
const obj = { a: 1, b: 2, c: 3 };
console.log({ ...obj, b: 4, d: 7 }); // {a:1, b:4, c:3, d:7}

// Keys that I include before the spread that exist in the spreaded object will be updated with the spreaded object's values
console.log({ a: 5, ...obj, c: 8 }); // {a:1, b:2, c:8}
```

Finally, I use what's called [Computed Property Names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015), which allows me to use a variable when defining a property name in an object literal. It looks like `[id]: {}`. It uses whatever the contents of the variable `id` as the name of the property.

These three things together allow me to immutably duplicate the original object, update values at specific keys dynamically, and do it safely, without having to worry about `undefined` errors.
