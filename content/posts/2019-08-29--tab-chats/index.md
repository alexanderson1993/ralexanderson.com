---
title: "Tab Chats: Communicating between open browser tabs"
author: "Alex Anderson"
category: "Thorium"
cover: hero.jpg
date: 2019-08-29
---

![Hero](hero.jpg)

_This is a post in a series about Thorium stories, tricks, and techniques. Learn more at [https://thoriumsim.com](https://thoriumsim.com)_

Thorium is designed to work in a regular web browser. It does have a dedicated Electron client which you can use to lock down a computer station, automatically connect to running servers, and provide more controls for the flight director, but those are just progressive enhancements. If Thorium doesn't work in a standard version of Chrome, I've done my job wrong.

That provides a lot of limitations. The web platform, and by extension web browsers, are designed to provide security against malicious actors. Since a browser's job is to connect to random computers all day, there are a lot of possible ways a bad guy could do something mean to browser users. That means lots of security and limited features for web developers.

But what if someone is making what is almost a desktop application that runs in a web browser? How do you add the features you need without violating security policies? This is a story of how I did just that.

---

Thorium creates a persistent identifier when it first loads on a client browser. When it connects to the server, it sends this identifier. The server checks it's database to see if that client has been assigned a station (basically a set of screens that client will show), and tells the client what screens it can show. This persists across refreshes, which means the client will always be able to show the correct screens, even if the browser is closed and opened again.

The identifier is stored in localStorage, which is scoped to the domain. That means if I open another browser tab and go to the same domain, I'll have the same localStorage values, including the client ID.

But what if I want to have two browser windows open, each assigned to a different station? Is that even possible? If I open another tab, it will just have the same client ID and it will get the same station assigned to it as the first tab. Not helpful.

# Splitting Up Client IDs

The solution I came up with starts simple enough. What if I can count how many tabs are currently open? If I can do that, I can find out what number of tab I am and use that to get the client ID out of an array of IDs stored in localStorage, instead of just a single item. This isn't trivial to do. I can't just say `window.getOpenTabCount()`.

Fortunately, there's a new API which allows me to send messages between tabs, windows, and iFrames on the same domain. It's called [Broadcast Channel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API), and it works in Chrome and Firefox.

The first thing you have to do is create a broadcast channel, first checking to make sure it's available on the browser.

```javascript
let broadcastChannel
if (window.BroadcastChannel) {
  broadcastChannel = new BroadcastChannel("thorium_clientCount")
}
```

Then I have to send a message to any open tabs to count how many are open. First, I send the others a message:

```javascript
broadcastChannel.postMessage("clientPing")
```

The other tabs have their broadcast channel listening for the 'clientPing' message.

```javascript
let tabClientIds = []

broadcastChannel.onmessage = function(ev) {
  if (ev.data === "clientPing") {
    if (clientId) {
      broadcastChannel.postMessage(clientId)
    }
  } else {
    if (!tabClientIds.includes(ev.data)) tabClientIds.push(ev.data)
  }
}
```

This `onmessage` handler does two things:

1. If the message is 'clientPing', then send a message back with my client ID
2. If I get any other message, it is a client ID. That means I can add that client ID to my list of open tabs.

But wait, what about the function that fired off the `broadcastChannel.postMessage("clientPing")` in the first place? If it can't synchronously get the list of client IDs used by other tabs, how does it end up getting the correct client ID? It wraps all of this up in a Promise, and has a timeout for getting all of the responses from its fellow tabs. The whole thing actually looks like this:

```javascript
let clientId = null

function getClientId() {
  return new Promise(resolve => {
    // If a client ID has already been assigned,
    // just return that. No need to ping again.
    if (clientId) {
      return resolve(clientId)
    }

    // This function grabs and parses the list of clients stored
    // in localStorage so we can filter it later
    const clientList = getClientList()

    if (!broadcastChannel) {
      // If our browser doesn't support broadcastChannel, then
      // just use the first item in our client list.
      setClient(clientList[0])
      return resolve(clientId)
    }

    // Ping the other tabs
    broadcastChannel.postMessage("clientPing")

    // Lets give a bit of time for the tab client IDs to get back
    setTimeout(() => {
      // If the client ID was set while we were waiting, just use that.
      if (clientId) {
        return resolve(clientId)
      }

      // tabClientIds is the list of client IDs that we got
      // back from the other tabs
      for (let i = 0; i < clientList.length; i++) {
        // If there is a client ID in localStorage that isn't
        // in our tab client IDs, then we can use the existing one
        if (!tabClientIds.includes(clientList[i])) {
          setClient(clientList[i])
          return resolve(clientId)
        }
      }

      // If we didn't end up setting a client ID, generate a random one
      // using three random words and add it to localStorage
      setClient(randomWords(3).join("-"))
      clientList.push(clientId)
      localStorage.setItem(key, JSON.stringify(clientList))
      return resolve(clientId)
    }, 500)
  })
}
```

Using that timeout gives a bit of time for the tabs to respond so we can generate a list of what client IDs are in use. Then we filter the list of all previously used client IDs which we grabbed from localStorage and use one of the unused client IDs. If all of them are being used, then we generate a new one and add it to the list.

One more clever trick: to make sure the tab keeps the same client ID when it refreshes, the `setClient()` function puts the client ID into sessionStorage. This is a semi-permanent storage which retains its values when the page is reloaded, but clears when the browser window is closed. Handy!

In practice, using this is as easy as going:

```javascript
async function useClientId() {
  const clientId = await getClientId()

  // Do something with clientId
}
```

It's a really simple API which encapsulates quite a bit of message passing and handshaking to finally come to a value.

Naturally, there are a lot of other things you could do with this, such as transmitting information about browser window location, sending data to a custom browser extension, or even [passing React state to a new window using React Portals](https://codepen.io/davidgilbertson/pen/xPVMqp).

---

This is just one of the many weird ways I've worked around the limitations of browsers, and there plenty more that I will write about.
