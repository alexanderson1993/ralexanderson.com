---
title: "JAM Stack"
author: "Alex Anderson"
category: "Devops"
cover: hero.jpeg
date: 2019-06-05
subtext: "This is a post in a series about code projects, open source, build tools, and deployment."
---

![Hero](hero.jpeg)

The second hardest thing in programming is naming stuff.<sup>1</sup> Maybe that's why every pattern and every trend has to have a name and branded website. LAMP. MEAN/MERN. MARS. Whatever.

[JAM](https://jamstack.org) is another stack acronym. It stands for _JavaScript_, _APIs_, and _Markup_.

So what makes the JAM stack special?

- It's fast. The "_M_" in JAM implies that you only serve static assets to browsers. This means less overhead for servers needing to boot up and process the request.
- It's cheap. Without a server running in the background, you save a lot of money.
- It's scalable. Theoretically, with a site built using JAM stack principles, you should be able to handle millions of requests a day without breaking a sweat.

Let's dive in to what these different pieces mean.

## JavaScript

> Any dynamic programming during the request/response cycle is handled by JavaScript, running entirely on the client. This could be any frontend framework, library, or even vanilla JavaScript.

<small>[JAMStack.org](https://jamstack.org)</small>

Modern websites are expected to be dynamic and interactive, and there's no way to do that on the web without JavaScript. This JavaScript is used to submit forms, load pages, gather data, perform searches, show animations, and anything in between. And JAM Stack isn't limited to a single framework; it only expects that you use JavaScript to make an engaging experience.

## APIs

> All server-side processes or database actions are abstracted into reusable APIs, accessed over HTTPS with JavaScript. These can be custom-built or leverage third-party services.

<small>[JAMStack.org](https://jamstack.org)</small>

APIs are what give your site dynamism and character. You'll use these APIs to store the form data or collect data from other sources. The APIs could be hosted on a dedicated server, but it is becoming much more common to host APIs on serverless functions or, even better, use a third-party API provided by another company like Google, Stripe, or AirTable. Many of these serverless functions and API providers have a generous free tier, which is great for small projects. If you're interested in these kinds of services, check out [CSS Trick's Serverless site](https://serverless.css-tricks.com).

## Markup

> Templated markup should be prebuilt at deploy time, usually using a site generator for content sites, or a build tool for web apps.

<small>[JAMStack.org](https://jamstack.org)</small>

In my opinion, this is the most important and most valuable part of the JAM Stack. CSS Tricks just put out a [great article](https://css-tricks.com/jamstack-more-like-shamstack/) about Markup. The key is making sure the markup is [statically hosted](/blog/why-static-hosting-is-awesome/). This gives you the flexibility to host your site on any number of providers on the cheap with benefits like a fast CDN and HTTPS support out of the box. Even better yet, you might want to try statically generating your site. I'll cover this in a future blog post.

## Bread's only purpose is to be a vehicle for JAM

In the world of acronyms, JAM is about as good as it gets. It's simple, it's cheap, it's easy to use, it's fast. Be sure to check out [JAMStack.org](https://jamstack.org) to learn more about how to get started. And keep watching this blog for some tricks on getting your JAM Stack hosted.

<hr />

<small><sup>1</sup> The first hardest thing in programming is off-by-one errors</small>
