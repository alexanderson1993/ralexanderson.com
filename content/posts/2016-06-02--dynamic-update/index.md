---
title: Dynamically Updating Javascript Resources for React Native if you don’t know what you are doing with Objective-C
author: "Alex Anderson"
layout: post
path: "/dynamic-react-native-update/"
category: "Code"
date: 2016-06-02
---

For a project at work, I’m creating a React Native app. The nice thing about React Native is you can load the javascript bundle (the brains of the app, so to speak) from a remote server. This means that you can make updates and changes without having to go through the App Store approval process.

The downside to this is that it takes a second or two to load the bundle before the app itself actually loads. Unless you have some fancy Objective-C or Swift ‘Loading’ animation, it’s just going to show a white screen. I don’t have any experience with iOS programming, so I decided to do the next best thing — load the bundle from the device locally.
I was able to piece together most of what to do from this guide, but some of it I had to figure out on my own.

[So You Want To Dynamically Update Your React Native App](https://medium.com/ios-os-x-development/so-you-want-to-dynamically-update-your-react-native-app-d1d88bf11ede#.qzg6q5n3o)

At work we recently shipped our first React Native components inside an app, and I’ve been mulling how (and if…medium.com
React Native gives you the option to have the JS bundle stored in the application bundle, which gives you almost instant load times. I could use that mechanism to do what I wanted.

First, I needed to check to see if there was a downloaded JS bundle or if I needed to use the app’s bundle:

```
//This is the document directory of the app itself.
NSString *documentDir = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
//filePath represents where the downloaded bundle resides. It's in the documents directory of the app.
NSString *filePath = [documentDir stringByAppendingPathComponent:@”main-loaded.jsbundle”];
NSURL *codeLocation = [NSURL URLWithString:filePath];

//use the application bundle if there is no file in the execution path
if (![[NSFileManager defaultManager] fileExistsAtPath:filePath]) {
//Load the app bundle's javascript
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@”main” withExtension:@”jsbundle”];
NSLog(@”Loaded from application bundle”);
} else {
//Load the downloaded Javascript bundle.
jsCodeLocation = codeLocation;
NSLog(@”Loaded from remote bundle”);
}
```

If you just throw this into your AppDelegate.m file, it will load the application bundle every time, since it isn’t downloading anything to the documents folder.

Next I asynchronously load the Javascript bundle from the remote server (in my case, I use Amazon S3 to host it)

```
remoteCode = [NSURL URLWithString:@”https://***path to your javascript bundle***"];
//Make the request asynchronously
NSURLRequest *request = [NSURLRequest requestWithURL:remoteCode];
[NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue currentQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *error) {
if (error) {
NSLog(@”Download Error:%@”,error.description);
}
if (data) {
//Save the data to the file path
[data writeToFile:filePath atomically:YES];
NSLog(@”File is saved to %@”,filePath);
}
}];
```

This is going to download the bundle and save it to the file path, but only after the application has already loaded.

Finally, use the boilerplate React Native code to insert the React Native view into the Objective-C app.

```
RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
moduleName:@”***Name of your module***”
initialProperties:nil
launchOptions:launchOptions];
```

Now, whenever your app loads, it will use the downloaded version of your Javascript bundle.
