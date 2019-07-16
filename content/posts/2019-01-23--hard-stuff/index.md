---
title: "Hard Stuff"
author: "Alex Anderson"
category: "Programming"
cover: hero.jpeg
date: 2019-01-23
---

![Hero](hero.jpeg)

I read this tweet recently:

<blockquote class="twitter-tweet" data-lang="en" style="margin-bottom: 30px"><p lang="en" dir="ltr">The most frustrating thing for me is how many people are struggling right now with something, and I’ve written the exact tutorial that will help them, and they won’t find it.</p>&mdash; Tania Rascia (@taniarascia) <a href="https://twitter.com/taniarascia/status/1087849284190511104?ref_src=twsrc%5Etfw">January 22, 2019</a></blockquote>

It's a great tweet, and she does indeed have a LOT of great tutorials (Thanks Tania!), but when I read that I thought to myself "I doubt she has a tutorial for me." I did my due diligence and checked her tutorials and I was correct. She has stuff talking about [Promise.all with Async/Await](https://www.taniarascia.com/promise-all-with-async-await/), [How to Use Local Storage with JavaScript](https://www.taniarascia.com/how-to-use-local-storage-with-javascript/), and [Styling UI Components from Scratch](https://www.taniarascia.com/styling-ui-components-from-scratch-buttons-forms/), but none of those touched on the specific issue I was facing. The closest she came was [The Three Types of Can't](https://www.taniarascia.com/the-three-types-of-cant/), but it didn't help me in the way I needed.

What is my issue? It isn't technical; it isn't operational. It is conceptual. That is, it deals with taking concepts and converting those concepts into code.

Sometimes, frameworks and libraries can make it easier to take those concepts and put them into the program. React, for example, has made it really easy to create user interfaces that update based on changes to state - a truly declarative UI. These frameworks are handy, but not every conceptual case can be easily translated to code.

My specific issue relates to my starship simulator controls, [Thorium](https://thoriumsim.com). To make it easier for the flight director to indicate to the crew specific actions which they need to perform as part of their simulation. These tasks must first be defined to say what actions can be performed, what values can be used as part of the task (which system to remove power from, or which type of damage control officer is needed for a repair team), and what criteria must be met for the task to be considered completed. It's complicated stuff and hurts my brain every time I have to work on it.

And that's the point. Yeah, there are some things that you can communicate with a tutorial, a cheat sheet, or a video series. But then there are other things that are too domain-specific or to involved to be able to generalize. Those that do manage to simplify something complex ends up becoming a superhero, but they have to tackle that complexity themselves at some point. Sometimes (most of the time, even), you have to beat your head against the wall. And even when you do figure it out, you wonder if you got it right. (This is why I have the greatest respect for people who design APIs for popular libraries and frameworks).

Programming is hard. Programming well is harder. Tutorials can get you far, but sometimes you just have to hunker down and figure it out. And that's why they pay us the big bucks.\*

\*PS: I'm looking for a job figuring this kind of hard stuff out. If you've got a place on your team for a fluent JavaScript Frontend developer thirsty to learn more and make great things, [get in touch](mailto:alexanderson1993@gmail.com).
