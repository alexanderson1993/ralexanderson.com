---
title: "Not having an opinion is good, actually."
publishDate: 2025-04-11
excerpt: Some thoughts on the value of principles, understanding tradeoffs, and understanding the foundation of best practices.
featureImage:
  src: "/assets/blog/levers.jpg"
---

How do you upload images in React Router?

- Do you create a signed URL on the server, send it to the client, have the client upload the image with that signed URL, and then pass the uploaded file's URL to the server?
- Do you use `encType="multipart/form-data"` to upload the file directly to the server?

How about how you store the images?

- Do you use S3, or an S3-compatible service like Backblaze B2 or Cloudflare R2?
- Do you upload it to your CMS?
- How about an image CDN, like Cloudinary?
- Why not just store it right on your server's filesystem, and serve the files directly?

And I'm still missing a bunch of other options!

Wouldn't it be nice if someone just told you the _right_ way to do it - what the "best practice" is?

Tools like Rails sell themselves on being opinionated - there is one conventional way to do things. And that's not a bad way to build a framework.

The thing is, there's a lot of reasons why you might choose (or not choose) one of the options I listed above. There are good principles behind all of them, some of them that might not even seem related to image uploading. Things liked limiting the amount of work the server has to perform, horizontal scaling and distributed workloads, post-processing job queues, CDNs and accessibility, cost, ease to implement... all factor into these decisions.

React Router sells itself on being _unopinionated_ - instead of saying "This is the conventional way to do such-and-such thing" they give us lots of _levers_ we can pull to build exactly the kind of user experience we want to build.

That means more responsibility for us developers - we have to learn all the different options for uploading images, choose a provider, and build out the solution instead of just installing a package - but it also means much more _power_ in making decisions for our apps and, ultimately, our users.

Naturally, there are some "best practices" that I think are always a good idea, like HTTPS and not storing passwords in cleartext and encrypting private data at rest and following laws and regulations. Those are kinda non-negotiable.

That said, depending on context, some "best practices" go right out the window.

Instead of clinging to "the right way", it's better to

- understand options, principles and tradeoffs,
- figure out the requirements for your app including how you want the user experience to be,
- then resolve the requirements with the tradeoffs, and use that to make your decisions,
- and validate your decisions with users to make sure what you built is actually good for them.

Ultimately, this sequence is where "best practices" come from in the first place!

---

You aren't beholden to some vengeful god who will smite you if you deviate from "best practices" that are esoterically encoded across dozens of blog posts and videos as if they were scripture.

You are beholden to your users - the people you're building your app for in the first place. Consider their needs, consider the technical requirements to fulfill those needs, and work from there.
