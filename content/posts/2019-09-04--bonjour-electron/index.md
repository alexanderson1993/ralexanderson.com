---
title: "Bonjour, Electron!"
author: "Alex Anderson"
category: "Thorium"
cover: hero.jpg
date: 2019-09-04
subtext: "This is a post in a series about Thorium stories, tricks, and techniques. Learn more at https://thoriumsim.com"
---

![Hero](hero.jpg)

[Electron](https://electronjs.org/) is a pretty nifty piece of software. For those who don't know, it combines a full Chromium-based web-browser with a NodeJS runtime, allowing you to create fully-fledged desktop applications with HTML, CSS, and JavaScript. You might be familiar with some Electron-based applications, such as Spotify, Discord, Slack, Visual Studio Code, and a whole bunch more. [There](https://medium.com/commitlog/electron-is-cancer-b066108e6c32) [is](https://hackernoon.com/the-problem-with-electron-162a70c3b29f) [some](https://hackernoon.com/electron-the-bad-parts-2b710c491547) [criticism](https://news.ycombinator.com/item?id=14629704) of Electron, but for the most part it is a good solution.

It also opens up a lot of possibilities. Being able to access lower-level APIs that aren't typically available to web browsers means you can give your web apps a bit more power and flexibility.

Before I go any further, I should point out that I designed Thorium to work perfectly well inside of a stock web browser, without any dependence on Electron. That said, I did create an Electron client application which adds the following features:

- It has a kiosk mode which locks down the computer and makes it so the crew cannot access other programs or files on the computer without first typing in the correct keyboard combination.
- It allows the Flight Director to remotely sleep, restart, and shut down computers running the kiosk.
- It provides a more robust multi-window support than the [multi-tab setup](/blog/tab-chats) which the regular web browsers support.
- It uses the Bonjour Protocol to automatically detect and connect to running Thorium servers.

It's that last point that we'll be focusing on today.

## What is Bonjour?

Bonjour is a zero-config networking protocol that allows for service discovery, address assignment, and hostname resolution. It uses multicast DNS, which in turn uses IP multicast queries to ask devices on the network to identify themselves. Compatible devices will send another IP multicast message informing all of the other devices that it hosts a service and include the IP address of the device, the name of the service, and the port that the service runs on.

Unfortunately, IP multicast requires sending UDP packets, which isn't possible within a web browser. That's why Bonjour only works in the Electron Thorium Kiosk.

## Bonjour Limitations

One major limitation of Bonjour is that, since it operates with UDP multicast packets, it only works within a local area network. You can't use it for service discovery across a Wide Area Network or the Internet.

Another limitation is that Bonjour service names must be unique within that network. This is easy to get around, as you'll soon see.

## Bonjour on the Server

For Bonjour to properly work, the service has to publish itself - it has to be configured to properly return messages asking for available services. Fortunately, there is a package in Node which handles this very easily, aptly named `bonjour`. It works like this:

```javascript
const bonjour = require("bonjour")()

function startBonjour(port = 3000) {
  bonjour.publish({
    type: "thorium-http",
    name: `Thorium-${require("os").hostname()}`,
    port: port,
  })
}
```

I'm doing a couple of things here:

- I use the publish function to listen for UDP multicast messages and respond to them.
- I configure the message to use a unique "thorium-http" type, which makes it easier to filter on the other end.
- I use a unique name by adding the computer's hostname to the end of "Thorium-". This is because Bonjour relies on each service having a unique name, and many Thorium users have multiple Thorium servers running on the same network.
- I provide the port, so the other end knows what port to connect to.

Now the server will respond to any Bonjour service requests!

## Bonjour in Electron

Now that the server is set up, I can start looking for it on the client. I can use the same `bonjour` package on the client.

```javascript
const bonjour = require("bonjour")();

class Bonjour {
  constructor() {
    this.browser = null;
    this.servers = []
  }
  start() {
    this.browser = bonjour.find({ type: "thorium-http" }, this.newService);
  }
  newService(service) {
    if (
      service.name.indexOf("Thorium") > -1 ||
      service.type === "thorium-http" ||
    ) {
      const ipregex = /[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}/gi;
      const address = service.addresses.find(a => ipregex.test(a));
      const uri = `http://${address}:${service.port}/client`;
      this.servers.push({
        name: service.host,
        url: uri
      });
    }
  }
  stop() {
    this.browser && this.browser.stop();
  }
}
```

Lets take a look at a few of these lines in isolation:

```javascript
this.browser = bonjour.find({ type: "thorium-http" }, this.newService)
```

This initializes the browser, using the 'thorium-http' type filter. Whenever it gets word of a new service, it fires off the callback in the last argument with the service information.

```javascript
const ipregex = /[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}/gi
const address = service.addresses.find(a => ipregex.test(a))
const uri = `http://${address}:${service.port}/client`
```

This uses a simple IPv4 address regular expression to grab the service's IP address out of the list of addresses which the service sent to us. It then interpolates the IP address and the service's port into a URL. That URL is then put into a list.

The app then uses that list to update the UI, allowing the user to choose between multiple Thorium servers (if there are multiple online). If there is only one Thorium server, it will wait for a little while and then automatically connect to that server.

How does it connect? It uses the URL it created earlier! Yep, all that it does is redirect the Electron window to point at the Thorium webserver, which takes over all of the UI from that point on.

That makes it super easy to connect. Just start the Thorium server, then turn on the kiosk. In a few moments, it will connect and you'll be good to go.

## Bonus: Safely sending messages from a 3rd party to Electron

Loading code from a third-party service into an Electron app is a bad idea - like, really bad if you don't know what you are doing. You are basically giving that third-party service the ability to do anything on your computer - access files, delete stuff, mine bitcoin - bad stuff! Even for Thorium this is dangerous - someone might try to masquerade as Thorium and then inject malicious code if I'm not careful.

Electron has great guides [on keeping your app secure](https://electronjs.org/docs/tutorial/security), and they still allow for messages to be sent between the third-party app and Electron. Here's how Thorium does it.

The first thing it does it turn off the Node integration, so the renderer process running the third-party code can't access Node APIs directly. I also specify a "preload" script which allows me to run some code before the window loads:

```javascript
const config = {
    backgroundColor: "#2e2c29",
    width: 800,
    height: 700,
    x,
    y,
    kiosk: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.resolve(__dirname + "/preload.js");
    }
  };
const window = new BrowserWindow(config);
```

The real magic happens inside my preload script.

```javascript
const ipAddress = require("./ipaddress")
const ipcRenderer = require("electron").ipcRenderer

const thorium = {
  sendMessage: function(arg) {
    return ipcRenderer.send("remoteMessage", arg)
  },
  ipAddress: ipAddress,
}

window.thorium = thorium
```

This gives me a simple API which I can use to trigger actions in Electron and know the IP Address of the computer running Thorium. Now, I'm in total control of what happens when the third-party code sends a message. I can choose to perform the action, based on the arguments they provide, or I can just ignore it. The key is that they can't perform any action in the Node environment that I don't explicitly allow.
