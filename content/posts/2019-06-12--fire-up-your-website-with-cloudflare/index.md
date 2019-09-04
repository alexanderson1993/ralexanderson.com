---
title: "Fire Up Your Website With Cloudflare"
author: "Alex Anderson"
category: "Devops"
cover: hero.jpeg
date: 2019-06-12
subtext: "This is a post in a series about code projects, open source, build tools, and deployment."
---

![Hero](hero.jpeg)

So you've got your site written, you've got it hosted somewhere (maybe using a [static host?](/blog/why-static-hosting-is-awesome/)), you've bought yourself a domain. How do you get your domain pointed at your website?

DNS is a tricky problem to solve, because the DNS server system takes a long time to update. Every time you make a change to your DNS settings, you have to wait between several minutes and several hours before the change propagates. Wouldn't it be nice if you could instantly see your DNS updates?

Enter Cloudflare. Cloudflare claims to make a better internet by improving speed, security, and reliability for the websites hosted on their services. How does it do this? Let's dive in.

## DNS

If you aren't familiar with DNS, you can check out [this comic](https://howdns.works) to learn the basics.

For our purposes, just know that your computer asks a server on the internet for the address of a website. It checks it's database of websites and if it can't find it it asks its friends. Those friends check their database and then ask their friends on and on until the website address is found.

When you register your domain, the domain registrar allows you to specify what are called "nameservers". These are the special addresses of servers that act as domain databases for your website. When someone asks for your website's address, the domain registrar will forward the request to whatever nameservers you set up and let them deal with it.

Cloudflare serves as one of those website databases. When you first set up Cloudflare, it will ask you to set your domain's nameservers to be Cloudflares servers. For example, my website's nameservers are nile.ns.cloudflare.com and tori.ns.cloudflare.com. These two will take any request about ralexanderson.com's DNS records and provide a response.

Here's the nice thing: Once the DNS network updates to have the DNS traffic go to Cloudflare's servers, any DNS updates that you make become instant. That's because the Cloudflare nameservers don't have to propagate changes to the rest of the DNS infrastructure - they dynamically look up the DNS information that you've put in for your site and provide the latest information whenver a DNS request is made. Handy!

And, of course, Cloudflare's DNS supports all of the standard DNS record types, like A, CNAME, MX, and TXT, so you can set it up any which way you need.

## Speed

Cloudflare also allows you to proxy requests through their servers, letting you take advantage of their global CDN, or content delivery network. This is a network of servers across the globe that mirror files, making it so people closer to one of those servers can load your website faster than if they had to access it wherever your server is.

For example, if your main website is hosted in Virginia, it would take a lot longer for a web browser in Germany to download the data, because the internet traffic has to cross the Atlantic Ocean. As it turns out, Cloudflare has many CDNs in Germany, so the content stored on the CDN can be downloaded much faster.

There are a lot of other speed improvements that Cloudflare offers, such as auto-minification of site assets, special compression tools, and HTTP/2 delivery.

## Security

Securing your site is super important (and even easier if you are using a [static site](/blog/why-static-hosting-is-awesome)). Cloudflare helps by providing a number of security tools and mitigation techniques.

The most important is HTTPS certificates, which encrypt the connection between browsers and your site. It's pretty much required to have an HTTPS certificate these days, but getting one set up (even with [Let's Encrypt](https://letsencrypt.org)) can be a pain. Fortunately, Cloudflare has your back. They've got options to enable HTTPS on your site and automatically redirect HTTP requests to use HTTPS.

They also provide an access firewall and IP access tools which can help if you are getting spammed or DDOS'd by bad actors.

## Extra Features

There are more things that Cloudflare can provide for your site. For example, if you were offering some kind of purchasing parity for your e-commerce site, and wanted to base it off of the user's country, you could use Cloudflare's IP country detection feature, like what [@wesbos](https://twitter.com/wesbos) did:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Thanks everyone - looks like Cloudflare&#39;s country header is about 100% accurate - impressive. Here is how to access in Express: <a href="https://t.co/743DTT3Ekh">pic.twitter.com/743DTT3Ekh</a>
<img src="https://pbs.twimg.com/media/DCINER2UAAEE0F_.jpg" /></p>&mdash; Wes Bos (@wesbos) <a href="https://twitter.com/wesbos/status/874275677083774976?ref_src=twsrc%5Etfw">June 12, 2017</a></blockquote>

There's a bunch of other stuff that they offer on their paid plans, but their free plan is plenty powerful for the average website.

## What Else?

I'm writing a whole post about Cloudflare because I really like it and it's what I use. That doesn't mean you have to use it, and there are definitely times when you shouldn't use it. For example, [Netlify](https://www.netlify.com) offers an awesome suite of features for A/B testing and deployment previews which are only available if you use Netlify's DNS offering.

However, I think that Cloudflare is a great way to get started. It's nice having the DNS settings for all of your sites in one place so you can easily modify them when necessary. And there's a lot they can do to help with speed, security, and performance. It's definitely worth it to make the hassle of setting up DNS disappear.
