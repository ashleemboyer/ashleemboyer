---
title: "Introducing textua11y: A Color Contrast Tool"
date: "2019-05-28"
description: Looking for a quick way to test foreground and background colors in text-heavy areas of your web application?
image: https://thepracticaldev.s3.amazonaws.com/i/ujvl87jd49qvfbsmcudz.png
---

Yesterday, I made a post about ideas and going after them. Every idea is a learning experience. There are no dumb ideas.

{% link ashleemboyer/just-make-that-app-59gl %}

Well, writing that post pushed me to elaborate on a super simple color tool I created for a post about generating Gatsby sites from JSON files. This site shows you whether to use black or white text on a colorful background. All of the colors come from the [Material Design color palette](https://material.io/tools/color/#!/).

{% link ashleemboyer/build-a-multi-page-gatsby-site-from-json-3kp %}

I'd like to introduce you to [textua11y](https://ashleemboyer.github.io/textua11y/). You can choose a text and background color, then use the Chrome developer tools to hover over the text elements and check your color contrast ratio. There's a lot to work with here.

![A demonstration of the app's first version](https://thepracticaldev.s3.amazonaws.com/i/gzt7rxfx2y83qldxosyw.gif)

I have multiple ideas on how to keep going with this, but I also want to hear from you! When you go to the site and click around, what do you feel like is missing? Anything random and cool you'd like to see? I'm excited to keep working on the tool this week.

Current top todos:

1. "Go back" between steps in the color pickers
2. Display text with the contrast score
3. Show the selected color hex values in addition to the names
