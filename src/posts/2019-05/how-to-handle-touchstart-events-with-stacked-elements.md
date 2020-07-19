---
title: How to Handle touchstart Events with Stacked Elements
date: "2019-05-31"
description: The touchstart event in mobile web apps is a little different than the click event. Here's how I solved an issue I've run into frequently.
tags: [web development, mobile]
---

I came across some issues on touch screens where I have a navigation menu expanded and the common "shadow" showing on the non-menu portion of the screen. When I tried tapping on the "shadow" to close the menu, way too many things were happening! Here's a quick illustration of what sort of screen I'm talking about:

![Mobile screenshot of a menu and its shadow](https://thepracticaldev.s3.amazonaws.com/i/ql9hc8t6rgeghdx1ikgw.png)

When a user taps on the "shadow" portion of the screen, they expect the menu to close. Nothing else should happen. You can handle this by adding a `touchstart` event listener to the element used for the shadow, but there are a couple of things to watch out for. It won't behave the same as a `click` event listener you use for the desktop version of your app.

It's all about when events are fired. A `click` event doesn't go until after a click is over and a mouse button is released. So, when a user clicks on the "shadow" with their mouse, there aren't any side effects. It's a different story for touchscreens, however.

If the items "behind" the "shadow" are clickable, a user touching the "shadow" to close the menu will also cause fire off the click events on those items. It's a pretty simple fix. In your `touchstart` listener, all you have to do is call `preventDefault` on the event passed into the listener. It might go something like this:

![Screenshot of touchstart event listener code showing call to preventDefault and some example lines of code for hiding the shadow and menu](https://thepracticaldev.s3.amazonaws.com/i/llil1vy7msaoswf3dbtf.png)

It's really that easy&mdash;a one-line fix. It wasn't super obvious to me at first, so I hope this helps clear things up for anyone else in the same boat as me. Have you ever run into similar issues? If so, enlighten us in the comments and save us some pain! :)
