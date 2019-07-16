---
title: "Why Static Hosting is Awesome"
author: "Alex Anderson"
category: "Devops"
cover: hero.jpeg
date: 2019-05-31
---

![Hero](hero.jpeg)

_This is a post in a series about code projects, open source, build tools, and deployment._

Can I tell you a secret? I run a (very) modest internet business distributing [spaceship simulator software](https://thoriumsim.com). Guess how much it costs me to run?

\$0.00<sup>1</sup>

Yep, that's right. It's free. How can I get away with it? Three things:

1. I don't have a lot of customers, which means I don't have a ton of traffic or data storage needs.
2. I run all of my websites on static file hosts, which have a very generous free tier.
3. I run all of my server-side code as serverless functions on providers that have very generous free tiers.

Today's post will focus on the second item in that list. A [future post](/blog/serverless) will cover serverless functions.

## What is Static Hosting?

If you are old enough to remember the Good Old Days™ of web development, back when Wordpress wasn't a thing and websites weren't interactive, you would also remember the humble HTML file. The basic building block of a website, the HTML file is what defines the content of your site. Couple that a simple stylesheet and maybe a bit of JavaScript to add some simple interactions, and you've got a full-blown webpage. Link those HTML files together, and suddenly you have a website, with linked pages. These HTML files are static, because they never change (unless the developer specifically changes them).

That wasn't enough, though. Dynamic websites, authentication, and user-generated content necessitate server-rendered websites; that is, sites where data from a database is placed into a template and then sent to the web browser. This is a dynamic page - it might be at the same URL, but the content might be different based on the user-generated content, user authentication, or any other number of factors. Think of sites like Facebook, Instagram, or Ebay.

## What's wrong with Dynamic Websites?

Dynamic websites are great, and definitely necessary when you have a lot of rapidly changing content, like the picture posts from Instagram or search results on Google. Nifty!

I specifically mentioned Wordpress because it made dynamic sites easy to set up for anyone! All you need is a webserver that runs PHP and MySQL - both free and open-source. However, web hosting isn't cheap, especially depending on how much traffic you have. Also, your precious website could easily be DDoS'd if a blog post happens to make the front page of Reddit and you get a lot of unanticipated traffic.

![Who enjoys these guys?](database-error.png)
<small>Who enjoys these guys?</small>

Does your blog really need to be dynamically hosted? The content of the blog probably changes a few times a week, at most. Maybe a bit more often if you have comments, but if you don't have comments then what is the point of dynamic hosting?

## Static Hosting Benefits

What makes static hosting so great?

- It's typically lower cost than dynamic hosting. Ultimately, it's just files being served - the easiest, simplest form of web hosting. Many hosting providers offer this service free of charge, and some providers specifically offer static hosting.
- It's easy to get set up. Again - it's just files. If you have the website working on your computer, you can be confident it will work just fine when it's hosted.
- It's faster and more performant than dynamic sites. Since the server doesn't have to process anything, serving the files is super easy. No database connection means no chance of your database being bogged down with requests. This makes your site load incredibly fast and never go down due to high traffic loads.
- It's more secure. How do you hack static files? Trick question - you don't.

## Static Hosting Providers

There are a bunch of providers, each with pros and cons.

### [Netlify](https://netlify.com)

If there were one host I would recommend, it's Netlify. They've got everything you could want in a static host under their free plan, and great add-ons to add additional functionality to your site.

_Pros_:

- The free plan is awesome
- HTTPS and custom domains
- Connects to Git, but also supports folder drag-and-drop
- Built-in build process for static site generators
- Excellent custom redirect support
- Great add-ons

_Cons_:

- Things get a little pricy after the free plan.

### [Github Pages](https://pages.github.com/)

If you know git, then you can easily get a website set up on Github Pages for free. And they even support fancy themes.

_Pros_:

- It's free
- HTTPS
- Automatic deployment with git

_Cons_:

- All of your pages live at _yourusername_.github.com, with each repository having it's own page, like _yourusername_.github.com/_repo name_
- Limited redirect support
- It's weird to get single-page apps set up

### [Surge.sh](https://surge.sh)

Use your command line to deploy sites easily and quickly with Surge.sh.

_Pros_:

- It's free
- It's easy if you know how to use a CLI
- Custom Domains and HTTPS

_Cons_:

- Requires you to use a CLI
- No redirect support on the free plan

## What about Dynamic Stuff?

So a static site is nice, but also kind of boring. What do you do if you want some dynamic content?

This is where the [JAMStack](https://jamstack.org) comes in. It stands for JavaScript, APIs, and Markup. The static stuff is your JavaScript and Markup. The APIs provide the dynamic stuff. I'll talk more about this in a future blog post.

You could also use a static site generator. I'll cover these in a future blog post too.

## Be Static

If you want to get started with your own website, a static site hosted on Netlify is a great way to go. It's cheap, it's fast, and it's easy. Just write up your HTML, throw it in a folder, and upload it. In seconds, you'll have your very own website, ready to go.

What are you waiting for? Be Static!

<hr />

<small><sup>1</sup> I mean, yes. It costs me a bit for the business license, a bit for hosting every year. But as far as variable costs go, it's basically free.</small>
