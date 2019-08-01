---
title: "React Plugins"
author: "Alex Anderson"
category: "React"
cover: hero.jpg
date: 2019-07-26
---

![Hero](hero.jpg)

_This is a pretty complex, experimental blog post, and likely unsuited to beginners. You might learn some interesting stuff though. Proceed with caution._

React can do some really wild stuff. In this post, I'll demonstrate loading remote React components and how that can be (ab)used to create a plugin system for a desktop-based React app. This post will blend a bit of React, some [build tools](/blog/javascript-build-tools), Electron, and a bit of experimenting. By the end, you'll know what it is, how to do it, and some of the pitfalls that you might find.

One of the cooler features is [`React.lazy`](https://reactjs.org/docs/code-splitting.html#reactlazy). This allows you to easily code-split your app using a bundler like Webpack or Parcel. Why code split? I should probably write a blog post about it (I did give a [talk](https://alexanderson1993.github.io/react-lazy-presentation/) on it), but here's a quick summary.

The bundler looks for signifiers like the [dynamic `import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). The bundler pulls that file and any dependent files out into their own bundle. Those files then don't have to be loaded by a client web browser until they are needed (this is called lazy loading), which keeps the main bundle size small, allowing for fast loading.

React has to parse React components that are code-split into something that can be rendered. It uses the new [Suspense](https://reactjs.org/docs/react-api.html#reactsuspense) component to show a loading state while the remote file is being loaded, and then replaces it with the component once it's ready.

So how can we use this to load remote React components?

# Loading Remote Components

We'll start on the React side of things. When I talk about the host app, I mean the React app which will be loading in the remote component.

The first thing that needs to happen is a small adjustment to our `src/index.js` file. By default, Create React App uses ReactDOM to render the app to the webpage. Since we won't want to do that when loading the app remotely, we need to change that so it just exports the App component:

```javascript
import App from "./App"

// ReactDOM.render(<App />, document.getElementById('root'))

export default App
```

There are likely other ways to create a remote React bundle that is loadable using `React.lazy`, but I've found the most effective build tool is Parcel. It's easy to use and has a really simple API compared to more configurable bundlers like Webpack. Since I'm using Parcel, I won't be able to use the default Create React App. Fortunately, Parcel's CLI makes it possible to build the app without having to eject.

When configuring Parcel, there are a couple of settings that you need to configure.

- `--public-url` - The bundler will likely output artifacts like CSS files and images. For your app to properly access those files, you have to set your public URL to the URL where you will be hosting the remote files.
- `--global` - We need to expose our component as a UMD module so it can be picked up by `React.lazy`. By providing a unique global identifier, the bundle will automatically return its default export when it is loaded by the host app. Note that this identifier needs to be unique, since it will also be attached to the `window` global object.

Another thing to consider is that Parcel creates separate bundles for the JavaScript and the CSS, so both files will have to be loaded and handled by your host app.

Once you've built your component, just host it somewhere that's accessible from a browser (eg. supports CORS).

In the host app, we'll have to load the JavaScript file, execute it so the UMD build can put the component on`window`, and finally pull the component off of the `window` object. We'll also keep a cache of components so loading the same URL doesn't execute the script a second time.

```javascript
const cache = {}
async function loadRemote(url, moduleName) {
  if (cache[url]) return cache[url]
  const moduleObject = await fetch(url)
    .then(function(res) {
      return res.text()
    })
    .then(function(res) {
      // eslint-disable-next-line
      return Function(res)()
    })
  cache[url] = moduleObject
  return window[moduleName]
}
```

We also need to load the CSS which was output from the bundle.

```javascript
const cssCache = []
function loadCSS(cssURL) {
  // 'cssURL' is the stylesheet's URL, i.e. /css/styles.css
  if (cssCache.includes(cssURL)) return
  return new Promise(function(resolve) {
    var link = document.createElement("link")

    link.rel = "stylesheet"

    link.href = cssURL

    document.head.appendChild(link)

    link.onload = function() {
      resolve()
    }
  })
}
```

These two functions can easily be abstracted into a custom hook, like so:

```javascript
export default function useRemoteComponent(data) {
  const comp = data
    ? React.memo(React.lazy(() => loadRemote(data.url, data.name)), [
        data.url,
        data.name,
      ])
    : null
  if (!comp) return null
  data.css.forEach(cssUrl => loadCSS(cssUrl))
  return comp
}
```

Notice the very strange memoization of React.lazy. It's strange, but it works. This hack is actually what spawned this tweet:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I just memoized the results of React.lazy(). AMA</p>&mdash; R. Alex Anderson 🚀 (@ralex1993) <a href="https://twitter.com/ralex1993/status/1154222650090070016?ref_src=twsrc%5Etfw">July 25, 2019</a></blockquote>

With a custom hook in place, pulling in a remote component is almost trivial. Notice that I pull out the theme context and pass it to my remote component as props so it has access to that context (see the pitfalls section below for why).

```javascript
function App({ pluginUrl }) {
  const Plugin = useRemoteComponent(pluginUrl)
  const theme = React.useContext(ThemeContext)
  return (
    <div className="App">
      <Suspense fallback="Loading Plugin...">
        <Plugin theme={theme} />
      </Suspense>
    </div>
  )
}
```

# Generating Component URLs in Electron

Since Electron just runs Node, technically this section is about generating the URLs with Node. Using plugins in Electron likely means you have a folder where you instruct your users to place the plugin files. These files could be created in a number of ways - perhaps they are a built Parcel app wrapped up in a zip? In our case, we'll have our plugins be folders of source files which we can then bundle directly<sup>1</sup> instead of using pre-bundled plugins.

The first thing you have to do is load in the plugin files from the plugin folder. We'll do this by parsing the plugin folder, getting the folders or files out, and generating URLs for them:

```javascript
const dirs = await fs.readdir(pluginPath)
const pluginFiles = (await Promise.all(
  dirs.map(async dir => {
    const stat = await fs.lstat(`${pluginPath}/${dir}`)
    if (stat.isFile()) return null
    const pkg = await fs.lstat(`${pluginPath}/${dir}/package.json`)
    if (!pkg.isFile()) return false
    const pkgData = JSON.parse(
      await fs.readFile(`${pluginPath}/${dir}/package.json`)
    )
    if (!pkgData.main) return false

    return {
      name: pkgData.name,
      path: `${pluginPath}/${dir}`,
      dirPath: dir,
      entryPoint: `${pluginPath}/${dir}/${pkgData.main}`,
    }
  })
)).filter(Boolean)
```

Notice that we are parsing the `package.json` file to see if there is a `main` entry. We'll use that to know what file to build with Parcel.

Next we can create a folder for our plugins to be built into:

```javascript
fs.mkdir("./.builtPlugins").catch(() => {})
```

We can now use the Parcel API to generate packages dynamically:

```javascript
const bundles = await Promise.all(
  pluginFiles.map(async ({ name, entryPoint, dirPath }) => {
    const options = {
      outDir: `./.builtPlugins/${name}`, // The out directory to put the build files in, defaults to dist
      publicUrl: `http://${ipAddress}:${port}/${dirPath}`, // The url to serve on, defaults to '/'
      watch: false,
      cache: process.env.NODE_ENV === "production",
      logLevel: 0,
      cacheDir: ".cache", // The directory cache gets put in, defaults to .cache
      contentHash: false, // Disable content hash from being included on the filename
      global: `${name}`, // Expose modules as UMD under this name, disabled by default
      minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
      scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
      target: "browser", // Browser/node/electron, defaults to browser
      bundleNodeModules: true, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
      sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
      autoInstall: true, // Enable or disable auto install of missing dependencies found during bundling
    }
    const bundler = new Bundler(entryPoint, options)
    return { name, entryPoint, dirPath, bundle: await bundler.bundle() }
  })
)
```

Once we have the bundles, we can parse them to pull out the critical artifacts.

```javascript
const plugins = bundles.map(({ bundle, ...rest }) => {
  return {
    ...rest,
    url: `http://${ipAddress}:${port}${bundle.entryAsset.parentBundle.name.replace(
      path.join(__dirname, `../.builtPlugins`),
      ""
    )}`,
    css: Array.from(bundle.childBundles.values())
      .filter(b => b.type === "css")
      .map(
        b =>
          `http://${ipAddress}:${port}${b.name.replace(
            path.join(__dirname, `../.builtPlugins`),
            ""
          )}`
      ),
  }
})
```

This provides us with a list of objects giving a URL for the primary JavaScript bundle, a list of CSS urls which can be loaded as well, as well as the plugin name and other metadata.

We can now provide that plugin list to an Express API which allows the app to fetch the list of plugins. We can also use Express to host the static files that were generated by Parcel.

```javascript
const app = express()
app.use("*", cors())

app.use(express.static("./.builtPlugins"))

app.get("/plugins", (req, res) => {
  res.header("content-type", "application/json")
  res.send(JSON.stringify(plugins))
})
```

# Pitfalls

Bundling a React component separately from the main app can cause a lot of problems.

For one thing, you might be running [two different versions of React](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375). Differences in the API between the two versions could cause errors when you try to render your component.

That also means your plugin bundles will be larger than necessary, since they could all have duplicate packages inside of them. They definitely won't be as lean as they could be using a regular React app using code-splitting.

Also, objects created in either of the bundles aren't accessible to one another. The most obvious example of this is React Context. I could access the 'same' context in both the main app and the remote component, but each bundle instantiates a different version of the context, so _you can't use context to send data from the main app to the remote component_. Instead, you have to rely on passing all of your data through props. If the remote component is large, you can create a new context provider which can grab the props and pass them down to the rest of the components.

On the other hand, some things in the remote bundle might mess with the global state of your app. Specifically, your remote bundle's module name (set with the `--global` CLI option) needs to be totally unique. Also, CSS styles could leak out of your remote component, so care must be taken to scope them properly.

Security is also something to consider. Loading and executing remote code is always risky, especially if you are doing it anywhere close to a Node context. Be careful employing this method and make sure you trust whatever plugins are provided.

I'm sure in my limited testing I've missed something. There might be more pitfalls you run into. If you do, I would love to hear about them. [Reach out and let me know.](https://twitter.com/ralex1993)

# So What?

Is this a good idea? Probably not. It seems like this could work, but the pitfalls and downsides might not make it worth it.

That said, there's a lot of weird stuff that you can do with React, and most of it isn't documented. Thats why it is up to you to explore. Do things that you shouldn't. Practice Wonder-Driven Development. Try things that you think shouldn't work, just to make sure you are right.

You might surprise yourself.

---

<small><sup>1</sup> Is having the app bundle the plugins a good idea? Yes and no. It gives you control over the bundling process, and makes it easier to make small adjustments to the source code of the plugins for easy modification. However, you'll have to figure out the node_modules situation - storing each plugin's node_modules means your plugins folder is going to be unnecessarily massive. Pre-bundling plugins provides less flexibility and requires an extra step for creating plugins, but it keeps your plugins folder small.</small>
