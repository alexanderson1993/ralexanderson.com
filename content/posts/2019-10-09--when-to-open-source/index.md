---
title: "When to Open Source"
author: "Alex Anderson"
category: "Thorium"
cover: hero.jpg
date: 2019-10-09
subtext: "This is a post in a series about Thorium stories, tricks, and techniques. Learn more at https://thoriumsim.com"
---

![Hero](hero.jpg)

It's [Hacktoberfest](https://hacktoberfest.digitalocean.com) season, which means novice and experienced open-source contributors are creating pull-requests to the plethora open-source projects that exist on Github. Some just want the tee-shirt and stickers; some want to add to their portfolio; some genuinely want to help out.

On the other end of things is the open-source maintainers who are in charge of the projects. For every one of those projects, there is a person who decided that their code should be open and available to the masses. That decision shouldn't be made lightly. Before, the developer could just work on their project in isolation; now, anyone in the world can come in and submit an issue or pull request. Also, their work could be forked into an entirely new creation.

So why would anyone want to open-source a project? And, more specifically, why did I choose to open-source Thorium, my starship simulator controls?

# Why Open-Source Thorium?

There are [plenty of reasons](https://opensource.com/life/15/12/why-open-source) to use and engage in open-source. My specific reasons boiled down to a few aspirations and hopes.

The primary reason for open-sourcing was wanting outside contributors to help out with the codebase. I learned to code by working on starship simulator controls, and I wanted to afford the same opportunity to other people without them having to create their own controls platform from scratch.

I wrote [a post](/blog/how-to-build-a-space-ship-part-3-the-controls) last year about the journey of building Thorium, and how I originally built the controls in secret. Even though nobody in the space center community knew about the controls, I was still asking friends and acquaintances outside the space center to help with the project. I even started the [WebDev Guild](https://webdev-guild.github.io) in the hopes that I could teach youngsters web development skills so they could contribute.

The only problem was I couldn't find anyone interested in contributing. All of my efforts to train new developers or recruit experienced developers fell flat. There are a number of people who have added a few things to the project, for which I am incredibly grateful. Yet, I [still have](https://github.com/Thorium-Sim/thorium/graphs/contributors?from=2016-06-19&to=2019-10-09&type=a) the largest impact on the Thorium codebase by a huge margin, and that's not changing anytime soon.

Why wasn't anyone interested in long-term contributions? I can think of a few reasons:

- This project isn't used on a regular basis by anyone outside of the space center, unlike other popular open-source projects like React.
- People in the space center community don't know how to program with sufficient skill to create complex simulator controls.
- People who do have the skills are putting it to good use making a lot of money at "real jobs".
- The very few who do have the drive and desire to contribute are intimidated by the very large codebase.

Lesson Learned: Building a community of contributors is tough.

Another reason the controls were open-sourced was the potential to apply for government grants to fund further development of the controls. Alas, writing grants is a difficult job, and one that I'm not cut out for.

# The perks of Open-Source

There are a lot of other great reasons to open-source your project. Thorium has enjoyed a lot of attention for being so open. I've actually had several people introduce themselves to me at local tech conferences because they recognize me as "The Spaceship Guy". I doubt that would happen if the controls themselves weren't publicly available.

There are also a lot of services which are available for free to open-source projects. For example, Thorium uses Travis-CI to do automated releases, and the releases are stored for free on Github, along with the code. There are a ton of other services which can make life easier that are completely free for open-source projects.

# What about the money?

I'm sure a lot of people wonder why I don't charge for these controls. I've thought about it a lot. It's a huge project; I've put a lot of time and effort into it, and I'm basically giving it away. Why not make some cash off it?

Firstly, I have made a good bit of money off it. The space centers that use Thorium have been generous and donated a decent sum of money to fund Thorium's development. It's hardly enough to support me working on the project full-time, but it's enough to know that the project is valuable to them.

That said, the market is incredibly small. There are 5 space centers in Utah which currently use Thorium on a regular basis. I know of other people who have started using Thorium throughout the world, but based on my observations, none of them use it for very long. It's a complex product built for very specific customers.

Unfortunately, those customers aren't rolling in cash. All of them offer incredible experiences at very subsidized prices, which means they don't have a lot of money to throw around. That means I can't sell the controls at a very high price.

Besides, I wouldn't be where I am today without the space center. That's where I learned to code; I practiced working with customers and creative problem solving as a flight director. I think giving back in some way is the least I can do for all I've been given. So I consider Thorium to be my "love letter" to the space center.

# Where are other open source controls?

Previous simulator controls weren't open-source at all. The code wasn't conducive to sharing and the space centers that contracted for the controls weren't interested in their intellectual property being used elsewhere. (In fact, I believe the simulator controls are the biggest barrier to creating a brick-and-mortar space center).

Since Thorium is wholly owned and copyrighted by me, I have the right to open-source it.

There are open-source bridge simulator controls, like the very impressive [Empty Epsilon](https://daid.github.io/EmptyEpsilon/), which are more focused on action and game play. Thorium is different in that it focuses on narrative and story.

# Would you do it again?

Frankly, I believe all simulator controls should be open-source. I think the ideas and values promoted by starship simulator controls, and by making them, are worth being spread as far as they can.

I think creating a starship simulator should be as simple as bringing your friends together into your living room with a bunch of computers, as easy as running it in a school computer lab, or as elaborate as a highly detailed set with automated lighting, sound, and viewscreen effects.

This is a terrifically lofty goal, and one that was not realized by Thorium. That said, I think it could be realized in the future, with a bit of planning.
