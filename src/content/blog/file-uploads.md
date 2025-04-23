---
title: "Opinions on File Uploads"
publishDate: 2025-04-23
excerpt: How should you upload files? Well, it depends.
featureImage:
  src: "/assets/blog/file-uploads.jpg"
---

I recently wrote about how [React Router is unopinionated](/blog/react-router-is-unopinionated/) and used file uploads as an example.

Fortunately, just because a framework doesn't have opinions about some things doesn't mean I can't.

For simplicity, let's say we're uploading to an S3 compatible object store. That includes S3, Backblaze B2, Cloudflare R2, Tigris, and many more. That API contract is the Lingua Franca of object stores.

We'll start by listing our options:

- Upload to the server using `encType="multipart/form-data"` on our `<form>` element and stream the file to object storage from there.
- Generate a pre-signed upload URL and upload from the browser directly to object storage.

> There might be others, like chunking exceptionally large files across multiple uploads, but we'll just focus on these two.

Let's look at the tradeoffs of each separately.

### Upload to Server

It's [become far simpler recently](https://github.com/mjackson/remix-the-web/tree/main/packages/form-data-parser) to include your file input with the rest of your form data, include `enctype="multipart/form-data"` on the form, and process everything with one submission. This also allows you to process the file as part of the upload process, which is convenient for small files with simple transformations.

As a bonus, this technique allows progressive enhancement, where the form can still submit even if JavaScript hasn't loaded.

However, this comes at the cost of extra work for your server. It's possible to stream the file directly from the request to the object store, limiting memory usage. But it's still CPU cycles that your server can't use responding to other requests. If you're using a serverless host, more CPU time means more cost.

### Presigned URL

Uploading with a presigned URL makes the browser wholly responsible for the upload. The upload is orchestrated by browser JavaScript, starting with a `fetch` request (or a `XMLHttpRequest` if you want to track the upload progress client-side). The results of that request provide you with the data you need to construct a URL to the uploaded asset, which you can either immediately send to your app server using `fetch`, or place in a `<input type="hidden">` for when the user submits the rest of the form.

This method offloads all the uploading to the browser, which can save server resources for other requests. Depending on your hosting, using less resources could save you money as well.

However, this method most likely requires JavaScript - no progressive enhancement possible here. That's likely not a problem, though, since JavaScript has likely loaded by the time your user goes to upload a file.

Another downside is that you can't do any server-side processing as part of the upload process. Most object stores have some kind of trigger API which lets you execute code when files are added to buckets, so if processing (if any) can be done asynchronously, this is a good option.

This method also requires a bit more ceremony, especially if you want to upload the file at the same time the form is submitted. You have to hijack the `submit` event on the form, perform the upload, get the response, slot it into the rest of the form data, and then send that to the server. Quite a headache.

And if you upload the files before the user submits the form, what do you do with the files if the user _doesn't_ submit the form?

So many edge cases.

### Everything is a Tradeoff

This is as far as I can take you in this blog post. I don't know what you're building. I don't know what your constraints or requirements are. I don't know what you're optimizing for. Picking one is literally left as an exercise to the reader.

- How important is it to upload the file as part of the normal form submission?
- How much extra infrastructure are you willing to add to support your choice?
- Are there certain features or behaviors that are only possible with one or the other?
- How does cost weigh in your decision? Scalability? Ease of development?

There's not an idiomatic way to do this. It all depends on the user experience you want and what tradeoffs you're willing to make.
