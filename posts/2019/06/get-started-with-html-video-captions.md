---
title: Get Started with HTML Video Captions
date: 2019-06-14
description: Adding captions to an HTML video isn't hard at all. You can get a mini project together in just a few minutes.
image: https://thepracticaldev.s3.amazonaws.com/i/0c29s1oopy8xoutfow4b.gif
tags: [a11y, captions]
---

Did you know you can add captions to `<video>` elements with a little HTML and a VTT file? I didn't know until today! It's really easy to do (so long as you format your VTT file correctly... shout out to [Conlin Durbin](https://twitter.com/CallMeWuz) for helping me find that error 😄). At a minimum, you need 3 files:

1. Video, probably `.mp4`
2. WebVTT, where the captions are
3. HTML

## Let's get started

### The HTML

![](https://thepracticaldev.s3.amazonaws.com/i/rpz0edrfb6otzqfuxlnz.png)

This is the easiest step. You only need 3 elements. On the `<video>` element, make you sure you include the [`controls`](https://www.w3schools.com/tags/att_video_controls.asp) attribute. This will allow users to toggle captions or switch to a different langue, if applicable.

The `<source>` element should be your video. Specify its `src` and `type` attributes. The `<track>` element is for the `.vtt` file you'll create in the next step. There are multiple attributes to include here.

- `kind` defaults to "subtitles", but if you specify it you must also include the `srclang` attribute.
- `label` is the title of the track and will be displayed in the video controls menu where captions can be toggled.
- `default` is included to set a track as enabled.

### WebVTT

![](https://thepracticaldev.s3.amazonaws.com/i/1fzurld4xwpnzy3x5nsw.png)

The format for this file is very specific. You must include "WEBVTT" at the top of the file, and then there are sections with white space in between which are called "cues". In the example file I've attached above, the first line of each cue is called the identifier. The next line specifies the timing for the cue. Finally, we have the cue payload. This is where you include the content for each caption. You can do _some_ styling here.

### The final product

The cover image has a quick preview of the captions I added to a video of a puppy playing on a sandy beach. Here's a GIF of the whole thing. You can also see my little project live [here](https://ashleemboyer.github.io/video-captions/).

![](https://thepracticaldev.s3.amazonaws.com/i/0c29s1oopy8xoutfow4b.gif)

### More resources

I wasn't able to find a ton of examples out there, but there are plenty of resources that get into the differences between subtitles and captions, styling abilities, and additional ways to accomplish the same thing as above but with different transcript formats or third-party libraries.

- ["How-to: Using captions with HTML's video element"](https://a11yproject.com/posts/using-caption-services-with-html5-video/) (The A11Y Project)
- ["Web Video Text Tracks Format (WebVTT)"](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) (MDN)
- ["HTML `<track>` Tag"](https://www.w3schools.com/tags/tag_track.asp) (w3schools)

If you have experience with captions that you'd like to share, or know of even more helpful resources, please do so in the comments! 😊
