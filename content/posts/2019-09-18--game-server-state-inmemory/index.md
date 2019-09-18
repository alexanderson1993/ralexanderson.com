---
title: "Game Server State Management"
author: "Alex Anderson"
category: "Thorium"
cover: hero.jpg
date: 2019-09-11
subtext: "This is a post in a series about Thorium stories, tricks, and techniques. Learn more at https://thoriumsim.com"
---

![Hero](hero.jpg)

[Thorium](https://thoriumsim.com) is a game. I know it's very much about storytelling, simulation, and role-playing; but architecturally, it is a game engine. It takes inputs from the players, runs a game loop behind the scenes, keeps track of the game state, and transmits that state to clients.

While the other three aspects each warrant a blog post in and of themselves, I'll be focusing on how game state is stored and persisted on the server.

# In-Memory Database

When it comes to a real-time networked game, the most important aspect is speed. If there is any lag between player input and that input responding on all of the other clients, the whole promise of real-time evaporates. While network speed and conditions has a lot to do with that, the calculations happening on the server are just as, if not more, important.

The problem with that is accessing and changing the data. Hard drives are slow; communicating between processes is slow. If I have to do either of those things to read or write any data, every single operation is going to be slower.

The solution? Store all of the data in-memory.

There are lots of ways to do this. Thorium operates off of a single global state object that contains the state for the entire program, including simulators, systems, crew members, messages - everything. Each of these items is modeled as class instances with references to other objects. If I want to find all of the systems on a simulator, I would search through the list of systems, filtering by the provided simulator ID.

The fact that I can grab all of this data from memory instead of searching the disk means that requests can respond almost instantly. That means the only slowdowns are the network latency and the process and render operations on the client.

Here's an example class that represents a crew team - either a damage team, security team, or medical team:

```javascript
import uuid from "uuid"

export default class Team {
  constructor(params = {}) {
    this.id = params.id || uuid.v4()
    this.class = "Team"
    this.simulatorId = params.simulatorId || null
    this.type = params.type || "generic"
    this.name =
      params.name ||
      `New ${this.type.substr(0, 1).toUpperCase() +
        this.type.substr(1).toLowerCase()} Team`
    // Location is either a deckID or a roomID
    this.location = params.location || null
    this.priority = params.priority || "low"
    this.orders = params.orders || ""
    this.officers = params.officers || []
    this.cleared = params.cleared || false
  }
  update({ name, location, orders, priority, officers }) {
    if (name || name === "") this.name = name
    if (location) this.location = location
    if (orders || orders === "") this.orders = orders
    if (priority) this.priority = priority
    if (officers) this.officers = officers
  }
  addOfficer(officerId) {
    this.officers.push(officerId)
  }
  removeOfficer(officerId) {
    this.officers = this.officers.filter(o => o !== officerId)
  }
  clear() {
    this.cleared = true
  }
}
```

Lets break this down.

The constructor takes any parameters, such as persisted data from existing objects, and puts them into the instance properties. Each property also has a default value, just in case a value isn't provided. One hard-coded value is the name of the class. This is what allows me to know what class to instantiate a JSON blob as when I'm loading in persisted data.

You can also see some references to other objects, like simulatorId and officerId, which reference the simulator the team is on and the officers which are in the team.

There are also instance methods which provide an explicit API for updating the values in this object.

If I wanted to get the officer objects for the officers in this team, I can just do a search of the `crew` object on the global in-memory database.

```javascript
const { officers } = team.officers

const crewObjects = App.crew.filter(c => officers.includes(c.id))
```

There are probably faster ways of accessing this data, but it is definitely faster than using an external database.

# Persistence

If all of the data is stored in-memory, what happens if the program closes? The data has to be stored somewhere persistent.

The solution is simple - convert the global in-memory database to a JSON dump and store it in a file. Since there are a lot of events happening, this isn't something you want to happen every single time there is a change to the database. Instead, there is a throttle which only updates the database dump within a certain interval, such as every 30 seconds if there has been a change.

When the program starts, it grabs the database dump file, parses it into an object, and loops through objects. Each object will instantiate a class (based on the `class` property which was hard-coded) with it's data and put it into the global in-memory database. Then the data is available to be queried and updated.

# Problems and Solutions

I'm not super proud of this implementation, but it works well enough. I have run into a few problems.

- The entire database is included in the single dump. That means that, even if a very small part of the in-memory database changes. This means writing the database to the JSON file can unnecessarily cause a CPU spike because it's writing more data than it needs to. This is an easy one to fix - I just need to separate the JSON files by what type of data it's storing. Mission timelines, which aren't updated very often, would be separated from simulator data, which is updated often. Better yet - use a filesystem database, like PouchDB or SQLite.
- Relational data isn't stored in a very optimized way, so those lookups might be slow. I'm not sure the best way to tackle this problem.
- Writing the classes and structures for all of this data can be a bit complicated and verbose. I'm using a home-grown modeling system, but there might be others, like MobX, which could help me model this data and relationships in a more performant way.

All of the stuff you've read about in this post is based on me making naïve decisions, running into roadblocks, solving performance problems, and doing lots of my own research. It may not be perfect, but it works well enough, and I've learned a lot in the process.
