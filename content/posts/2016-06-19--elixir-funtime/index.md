---
title: Funtimes with Elixir and Phoenix
author: "Alex Anderson"
layout: post
path: "/elixir-funtime/"
category: "Code"
date: 2016-06-19
---

I’m starting to learn Elixir with the Phoenix Framework. This project has a pretty intense stack. I don’t know a whole lot about all of the pieces, but I can try to explain it here:

1. The front-end will be designed with React, a view framework built by Facebook. It’s designed to be highly composable, functional, and fast. Each component is designed to be a stateless function which returns the code necessary to create the objects in the DOM.

2. The front-end data layer will be Redux. Redux was invented to solve the problem of state management. It is mostly used with React, but can be used with just about anything. It focuses around a single state store which is immutable. It can only be updated by firing actions, which in turn trigger reducers which then update the state store.

3. Elixir is a functional programming language based off of Erlang. It’s designed for concurrency and crazy-high uptime. There’s a whole lot about it that I don’t understand, but that’s the whole point of this exercise, right? Phoenix serves as the web and application server for this project. It connects to Redux via websockets, which Phoenix supports natively. This will provide real-time communication between the server and Redux.

4. The database is RethinkDB, an open-source JSON storage DB built around real-time comunications. It’s most often compared to Mongo, but excels in speed, durability (eg. the way it handles reads and writes) and real-time pushing of data.

As someone who is used to the monolithic archetecture of Meteor (client, server, and database all connected together), this is both daunting and exciting. I’m not really used to pieces that connect together like this and with all these moving parts I fear that things might break suddenly. However, this will provide for improvements in modularity, code quality and readability, and explicitness in how the project is designed (Mongo is notorious for poor to no schema support.)

This means that I’ll be able to pull out any of these pieces and replace them with anything else. I could pull out React and use Angular (or even jQuery) and link it up with Redux. Phoenix becomes too daunting? I can switch it to Node or something else fairly simply.

This will be very useful when this project grows and has more features and use cases, I’ll be building apps with React-Native. With websockets, I can just plug these into the database and it’ll just work.

I’ll continue writing things which relate to this, along with other things which come up in my programming adventures.
