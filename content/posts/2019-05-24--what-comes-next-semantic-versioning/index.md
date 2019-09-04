---
title: "What comes next? Semantic Versioning"
author: "Alex Anderson"
category: "Devops"
cover: hero.jpeg
date: 2019-05-24
subtext: "This is a post in a series about code projects, open source, build tools, and deployment."
---

![Hero](hero.jpeg)

People often get really excited about new versions of things - iOS 13, Chrome 73, ES2018. All of these represent the latest and greatest, and everyone is itching for the 2.0 of whatever thing they're into.

But what do these numbers even mean? iOS's version is the number of years since the first release of iOS (since there is a new release every year). JavaScript (ES) is versioned based on the year. And Chrome? No idea there.

[Semantic versioning](https://semver.org), or Semver, defines what the three points of a version string should represent.

Suppose we have the version 2.5.4.

The first number (2) represents the _major_ version. This only changes when there is some kind of breaking change, which we'll talk about later. This lets the user know that some part of the software might not work the same way as it did before.

The second number (5) represents the _minor_ version. This changes whenever the version adds new features or functionality without removing or breaking old functionality. This is considered a backwards compatible version.

The third number (4) represents the _patch_ version. This changes whenever a bug fix is added to the code. A bug fix is anything that fixes incorrect code behavior. Also, a minor version might also include bug fixes in addition to new features.

Users of software with semver can be confident that a change in a minor or patch version will only ever be a good thing and won't break anything. However, they should be careful of new bugs or things that have broken in major versions.

This makes major versions seem not as good as before, doesn't it?

## Breaking Changes

Why would the developer of software ever release something with a breaking change? There are a lot of reasons, and all of them depend on the situation:

- Some improvement or feature cannot be implemented without fundamentally changing how something else works.
- A new API or method of doing something is superior to the old way, and after the new API has been in place for a while the old can be removed.

## Major Version 0

<blockquote class="twitter-tweet" data-lang="en" style="margin-bottom: 30px"><p lang="en" dir="ltr">Semver is cool as long as people release a 1.0, which nobody seems to do anymore.</p>&mdash; Ryan Florence (@ryanflorence) <a href="https://twitter.com/ryanflorence/status/410540892554932224?ref_src=twsrc%5Etfw">December 10, 2013</a></blockquote>

If you are just starting out on a project and are making changes on a regular basis, consider staying on major version 0 for a while, as in 0.x.y. By definition, any version in major version 0 can introduce breaking changes - that's the point. It allows for rapid prototyping while the API is coalescing.

Once a stable API has been decided and validated, you can increment the major version to 1 and start following Semver rules when it comes to breaking changes.

## Managing Expectations

While Semantic Versioning may seem like a very robotic, algorithmic way to handle versions, versioning still requires a human touch. If you have created a very popular open source library (congratulations!), your users are depending on you to be a careful steward of that project. The version is a way for you to signal to your users about changes in the project, but that doesn't mean it is the only way to communicate.

As an example, [React](https://reactjs.org) is used extensively at Facebook, so the development team has to be very careful about adding breaking changes - one breaking change means they have to apply fixes in over one hundred thousand components that Facebook uses. That's not a small number!

But progress needs to happen, and someday they will finally make the jump to React 17.0.0. What are they doing to prepare for that?

- Adding depreciation warnings to let you know if you are using something that you shouldn't be.
- Adding an opt-in `<StrictMode>` component that adds additional warnings about things that will break in future versions.
- Being transparent about the roadmap and timeline for when drastic changes will happen. Interestingly enough, no word has been said as to when React 17 will be released - everything on the current roadmap is a backwards compatible feature.

## What Matters Anyway

What your users really want is software that works without any surprises. For you as the software developer, that means fixing bugs, adding necessary features, and most importantly understanding what your user really wants and needs. Can your user afford to do the necessary refactoring to upgrade your package to a major version? Is there some other way you can accomplish the goals of your project without a breaking change? You'll have to figure that out.

What Semantic Versioning does is provides a small contract between the developer and the user. It sets expectations in a simple, clear, effective way.
