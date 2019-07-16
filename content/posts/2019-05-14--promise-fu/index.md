---
title: "Promise Fu"
author: "Alex Anderson"
category: "JavaScript"
cover: hero.jpeg
date: 2019-05-14
---

![Hero](hero.jpeg)

If you aren't familiar with promises, be sure to check out [my earlier post on the topic](/blog/i-promise-youll-like-this/). In this post, I'll be talking about some interesting, unique, and downright weird things you can do with promises.

## Regular Promises

Promises encapsulate asynchronous actions and handle running them in the background and reporting the result. Successful results can be accessed through the `.then()` method; errors are handled with `.catch()`. If the function passed to `.then()` returns a promise, then more `.then()` and `.catch()` statements can be chained to the end. Also, errors bubble up the promise chain until they meet a `.catch()`, so a `.catch()` can be added at the end to handle all errors in the whole chain.

```javascript
fetch("http://example.com")
  .then(res => res.text())
  .then(res => console.log(res))
  .catch(err => console.error("Error accessing page:", err));
```

## Multiple Resolve Handlers

You can actually perform multiple actions on the same promise:

```javascript
const myPromise = fetch("http://example.com").then(res => res.text());

myPromise.then(res => console.log("Resolution 1", res));
myPromise.then(res => console.log("Resolution 2", res));
```

Both will execute when the promise resolves.

## Creating Promises

You can create promises from scratch with any kind of action that happens asynchronously. You can also use `Promise.resolve()` and `Promise.reject()` to create promises that immediately resolve or immediately catch:

```javascript
const timerPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

timerPromise.then(secondCount => console.log(`I execute after ${secondCount} second!`)); // I execute after 1 second

Promise.resolve("Hello").then(res => console.log(res)); // "Hello"
Promise.reject("Error").catch(res => console.log(res)); // "Error"
```

The `resolve()` and `reject()` functions pass their arguments to the `.then()` and `.catch()` functions.

## Parallel Promises

You can have two promises run at the same time by just running them next to each other:

```javascript
const promise1 = fetch("http://website1.com").then(res => res.text());
const promise2 = fetch("http://website2.com").then(res => res.text());
```

Note a few limitations:

1. You can't access the results of one promise in the other.
2. You can't access the results of either promise in the function that calls them. Everything the promises do has to happen inside of the promise's chain.

Like parallel lines, the promises never touch.

## Concurrent Promises

You can run multiple promises at the same time and have the results of all of the promises continue down the promise chain. To do this, you use the `Promise.all` function:

```javascript
const promise1 = fetch("http://website1.com").then(res => res.text());
const promise2 = fetch("http://website2.com").then(res => res.text());
Promise.all([promise1, promise2]).then(([result1, result2]) => {});
```

`Promise.all` is passed an array of promises. The `.then()` at the end resolves once all of the promises in the array resolve. If one of them errors, the whole promise errors.

## Turning Lists into Promises

Suppose I have a list of things, like:

```javascript
const pokemon = ["bulbasaur", "squirtle", "charmander", "pikachu"];
```

And I want to fetch them from an API. I could create the promises by mapping the array:

```javascript
Promise.all(
  pokemon.map(p => fetch(`https://pokeapi.co/api/v2/pokemon/${p}`).then(res => res.json))
);
```

I can also sequentially run a list of promises using `.reduce()`:

```javascript
pokemon.reduce(
  (accumulator, name) =>
    accumulator.then(pokemonList =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json)
        .then(res => pokemonList.concat(res))
    ),
  Promise.resolve([])
);
```

Also, notice how I am resolving my `fetch()` promise inside of a single `.then()` function instead of chaining them. This lets me access the `pokemonList` variable and use it with the results of my `fetch()` promise.

## Recursive Promises

Suppose I wanted to get a list of all Pokemon, and each response from `https://pokeapi.co/api/v2/pokemon` gives me the next url, like so:

```json
{
  "count": 964,
  "next": "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
  ...
  ]
}
```

I need to zip up my results into a single array, and need to keep fetching until the API doesn't give me a next URL. I can use a recursive function to do that:

```javascript
function getPokemon(url, results) {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.next) {
        return getPokemon(res.next, results.concat(res.results));
      }
      return results.concat(res.results);
    });
}

getPokemon("https://pokeapi.co/api/v2/pokemon/?limit=20").then(allPokemon =>
  console.log("All Pokemon", allPokemon)
);
```

## Rate-limited Promises

Suppose the Pokemon API only allows for a limited number of requests per second and I wanted to get a large list of Pokemon. I wouldn't want to use the mapping function to get all of the Pokemon all at once - that would cause errors because I'm requesting too fast. Instead, I can rate-limit my requests with Promises:

```javascript
const pokemonIds = Array.from({ length: 50 }).map((_, i) => i + 1); // [1,2,3,4,...,100]

function doPromise() {
  if (pokemonIds.length === 0) return Promise.resolve([]);
  // Grab an ID and remove it from the pokemonIds array
  const id = pokemonIds.pop();
  console.log("Fetching", id);
  // Return a promise
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(res => doPromise().then(secondResponse => secondResponse.concat(res)));
}

// Make our list of fetchers

Promise.all(Array.from({ length: 8 }).map(() => doPromise())).then(results =>
  console.log(results.flat())
);
```

This will probably put your results out of order, so make sure you sort them when you're done.
