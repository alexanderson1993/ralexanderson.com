---
title: "Serverless"
author: "Alex Anderson"
category: "Devops"
cover: hero.jpeg
date: 2019-06-13
subtext: "This is a post in a series about code projects, open source, build tools, and deployment."
---

![Hero](hero.jpeg)

In March of 2006, Amazon Web Services launched and changed everything<sup>1</sup>. Before, there were a bunch of different hosting providers that you could pay to rent out an entire server on one of their server racks, or you could just host the server yourself. Renting an entire server is a costly endeavor, though.

Amazon's growth as a massive online retailer meant they had a lot of servers, but the seasonality of Amazon's business (more purchases around holidays and during sales) meant that a lot of that compute power was going to waste. Why not sell that extra compute power to other people? Instead of you getting an entire server, you get a virtual machine at a fraction of the cost that other hosting providers were charging. Not only that, but you also get access to Amazon's first-class tools for provisioning servers, making backups, storing files and data, and processing network traffic. The real trick is the virtualization - multiple tenants operating on the same hardware which means it's always running at a high efficiency.

As time has gone on, the server tricks and cost savings have evolved. The latest craze among cloud providers<sup>2</sup> is serverless.

## What is Serverless?

What virtualization did for server hosting in the 2000s, containers are doing in the 2010s. A container is a small bare-bones virtual machine that only has what's necessary to get up and running. Containers are separated from one another, have fast startup times, and often share system resources to make them lean and efficient.

Of course, containers have to run on a server somewhere. There is still a server involved. But the person using containers doesn't have to be so concerned about the nature of the server. As long as it can run containers, it doesn't matter what the containers themselves do.

Serverless functions are containers that have a specific purpose and can be dynamically triggered in a number of ways, like via an HTTP request. Since they are so easy to start up, it's common to shut them down right after they are done doing whatever it is they were supposed to do, which makes them really cheap to run too. In fact, cloud providers charge by the second that a serverless function is being run, making them great for short-running processes.

And, since serverless functions are stateless (meaning you don't store persistent data in a serverless function - you send it to a more persistent database) and start fast, scaling with extra load is trivial - you just start up another container and split some of your traffic to go to it.

## How do I use serverless?

I want to get one thing out of the way right now: Serverless isn't trivial to do. It's still kind of tough to make sure that you've got everything set up and wired in the right way. And sometimes you will need a dedicated server, especially for long running processes or processes that depend on being online for a long time such as anything involving websockets. But it's certainly a heck of a lot easier to use a simple serverless function than making sure your dedicated server has all of the dependencies, that security updates are being run, that you've got all of your application code backed up in case the server crashes, that your load balancer is set up properly, and a bunch of other stuff.

What about which provider to use? My recommendation is this:

Don't use any of them.

What I mean is don't use any of the major players. I've found that interacting with them directly is difficult - there's a lot of configuration that's necessary to get it set up that might make sense for a larger site but probably won't make a difference for a small hobby site.

Instead, look for third-party services that operate on top of one of the major cloud providers. Here are some examples.

### [Netlify](https://www.netlify.com/products/functions/)

Yep, I love these guys. They'll get you up and running with serverless functions (that run on AWS Lambda behind the scenes) for super cheap. Not only that, but it's super cheap to get set up. Just plop some JavaScript files inside of a `functions` folder in your project and add it as a Netlify site. They'll automatically deploy and manage the functions and give you a URL which you can use to activate them. They also give you versioning for your functions in case you need to roll back.

### [Firebase](https://firebase.google.com/)

Firebase hides behind Google's Cloud Platform, but gives you a ton of powerful tools. Their Firebase functions are almost as easy as Netlify to use - just run a couple of commands with their `firebase-tools` CLI to get your functions up and running. They get a special mention for their other products, like their authentication platform or their very affordable Firestore database which you can use to store your data. I use Firebase for a lot of my sites, and haven't had to pay a penny yet.

### [Zeit](https://zeit.co/)

Zeit calls themselves the Global Serverless Platform, and they deserve the title. They have tried to make their Now platform as seamless and easy to use as possible. Again, using their Now CLI tool, with one command you can instantly deploy serverless sites and functions with ease. Like everyone else, they offer a very generous free plan which should suite most sites needs.

### Honorable Mention: [Cloudflare Workers](https://www.cloudflare.com/products/cloudflare-workers/)

Cloudflare gets [another mention](/blog/fire-up-your-website-with-cloudflare/) in today's post for their Cloudflare Workers product. This is like serverless on steroids. I can't explain it very well, but basically they've created an incredibly lean JavaScript runtime that starts up faster than regular containers and they deploy your serverless functions directly to all of their 180+ data centers across the globe, meaning your functions will run incredibly fast. They just announced a free plan which I have yet to try out, but I'm excited for the innovation they are bringing to serverless.

## Want to learn more?

Chris Coyer has much more to say about serverless, and a lot more resources, so make sure you check out [CSS Tricks' Serverless site](https://serverless.css-tricks.com/).

See what you can come up with!

<hr/>

<small><sup>1</sup> I remember sleuthing around websites source code around the same time that AWS came about and wondered "What is this amazonaws (which I pronounced "Oz") thing hanging out in these URLs? As it turns out, they were the first files uploaded to AWS S3.</small>

<small><sup>2</sup> Amazon Web Services has been joined by Microsoft's Azure in 2010 and Google's Cloud Platform in 2013. There are scores of other contenders, but those three represent the most prolific general-use cloud providers out there now.</small>
