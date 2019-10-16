---
title: "How I would build Thorium differently"
author: "Alex Anderson"
category: "Thorium"
cover: hero.jpg
date: 2019-10-16
subtext: "This is a post in a series about Thorium stories, tricks, and techniques. Learn more at https://thoriumsim.com"
---

![Hero](hero.jpg)

There comes a point in any project's lifecycle when one can look back and see all the alternate choices that might have made the project better. Maybe "regret" is too strong a word, but there are things I wish I did differently with Thorium now that I have a bit more experience and have seen the project used by customers.

And there have been a lot of great decisions too! Betting on React, JavaScript, and the Web is something that I don't think I'll ever regret; the same can be said for GraphQL. Organizing things into Simulators, Stations, Cards, Flights, and Systems makes a lot of sense too.

That said, I've been thinking over the past few weeks about what's missing or what's wrong. I wrote about a few of them when I talked about [Thorium's GraphQL setup](/blog/graphql-queries-and-mutations-in-thorium). Also, technologies and tools have changed and improved in ways that make the developer and user experience better.

So, without further ado, here's an abridged (but still long) list of what I would do differently.

- Write more automated tests so I can be confident that the code is working the way I intend.
- Use TypeScript so I can more easily trace breaks in the system, discover error states quicker, and have nicer IDE integration.
- Use Storybook for writing cards and components in isolation. This would likely yield a faster development process, since I don't have to reload the entire app when working on a single component. This would also likely help with client-side testing.
- Wrap the entire app in `<React.StrictMode></React.StrictMode>` so I can be confident that I am using modern React practices and be ready for React Concurrent Mode benefits.
- Have clean data flow between parents and children. I would do this by using more React contexts, or perhaps a global state management library like MobX.
- Write GraphQL queries with more care and structure. For example, making sure that there are both plural queries that return a list and singular queries that return an individual object.
- Speaking of GraphQL, make it so mutations follow a {system}{operation} format, such as `phasersFire` and `simulatorAlertChange`. This makes it easier to group mutations when sorted in alphabetical order.
- Make sure the subscriptions are atomic and scoped to just what the subscriber wants. Right now, subscriptions are sent to all kinds of clients all the time for all kinds of reasons. Being able to have more granular subscriptions reduces both network traffic and the load on the clients.
- Add proper mutation responses for all GraphQL mutations. It's irresponsible to not include them.
- Take advantage of my in-memory database and store referenced objects directly on their parent. Right now, Thorium's data is set up in a relational way, but there is no reason I can't just store a simulator's systems and crew on the simulator itself.
- Use Axe-Core and Jest-Axe to do proper accessibility testing. Make sure the controls look good for everyone, because there are definitely people with accessibility needs using these simulator controls.
- Make the GraphQL and Client server use the same port, and make that port easy to type in. I thought I was clever using 1337, but that's just a pain to type in sometimes.
- Make better default configurations, and make the configuration process easier to do.
- Make it so only one flight can be run on a single Thorium server at a time. Since multiple Thorium instances can operate on the same network (an unexpected feature request), there's no reason why you can't just spin up another server for a separate flight. This simplifies things substantially.
- Simplify the storage system. Right now, persistent storage is a [massive JSON file](/blog/game-server-state-inmemory) that gets saved whenever anything changes, with a throttle so it isn't saving immediately. However, this means that massive mission and simulator configurations get saved, even though they have nothing to do with the change that was just made. This is expensive for the CPU and totally unnecessary. Separating configs from the flight data makes them more portable and makes the server less prone to slowdown.
- Put more effort into user experience, especially for beginner flight directors. That's the biggest obstacle which people face when they discover Thorium. The flight director experience is difficult to get into. It should be easier.
- Use Electron to bundle the app instead of PKG. This makes for a much nicer user experience, with the bonus that the client kiosk is built into the server.
- Use CSS-in-JS so we don't have to worry so much about the spaghetti code caused by tons and tons of CSS class definitions. More than once I've had problems with styles leaking out and messing with things they shouldn't be.

---

That's a pretty long list, and only scratches the surface. That said, I'm pretty confident that all of these things are possible to do, not with a re-write, but just by refactoring the existing code. Why throw out a perfectly good set of simulator controls when they can be refactored just as well?

If you are interested in helping out and contributing to this project, [get in touch](https://discord.gg/UvxTQZz).
