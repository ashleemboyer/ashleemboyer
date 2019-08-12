---
title: Re-Create an Image with Colorful Text
date: "2019-08-11"
description: Try some art with your code.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2FtrooperText.png?alt=media&token=ec6a85f8-12e9-4c5d-b7c0-2ef89c770bc4
---

Hey, friends! It's been a while, but I'm back with something fun. Yesterday, I tweeted out about an image I analyzed and then re-created with my name. It's garnered quite a bit of attention so I figured I'd tell everyone how I did it! It involves the HTML `canvas` element and a little bit of looping over data from that to get information about the colors within the image. Let's get started!

_Quick note: There will be a CodeSandbox at the end of every step so you can follow along and check your work as you go._

## Table of Contents

1. Set up Your HTML & JS
2. Draw Your Image on the `canvas`
3. Get the `ImageData`
4. Iterate to Get Pixel Colors
5. Append Some containers
6. Resources

---

## 1. Set up Your HTML & JS

This step is pretty boring. Nothing will be showing on the page after you're done here. There are two main things to note:

- You only need to set the `crossorigin` attribute to `Anonymous` if you're working in a code sandbox. A security error comes up otherwise.
- We can't actually do anything with our image until it loads. Make sure all of the upcoming code is written within the `onload` event listener!

<iframe src="https://codesandbox.io/embed/step1-fvnqc?fontsize=14&view=editor&module=index.js" title="step1" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## 2. Draw Your Image on the `canvas`

Now that we have our image loaded and the `canvas` on the page, we need to get the 2D rendering context for our canvas. We'll call `drawImage()` on the context and pass in three arguments:

- the image we want to draw
- the x coordinate to draw at
- the y coordinate to draw at

We only had to add two lines in this step. Your image should be showing up now! :)

<iframe src="https://codesandbox.io/embed/step2-6frr9?fontsize=14&view=split&module=index.js" title="step2" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## 3. Get the `ImageData`

We're almost to the trickier part of this process, but first we need to get some data from the context. We put this in a `try...catch` in case any thing goes wrong. For example, this is where you would see the security error from not setting the `crossorigin` attribute of your image.

The `getImageData()` function takes 4 arguments:

- x coordinate to start reading from
- y coordinate to start reading from
- width of area to read from
- height of area to read from

Note that we're reading from the whole canvas because the image is pretty small and that's how we set everything up. If you want to, you can draw a much bigger image on your canvas and then read data from a smaller area by modifying these 4 arguments.

<iframe src="https://codesandbox.io/embed/step3-1b380?fontsize=14&view=split&module=index.js" title="step2" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## 4. Iterate to Get Pixel Colors

The `ImageData` object we get in the previous has 3 properties: `data`, `width`, and `height`. We're interested in the first one. Here's where things get a little weird. The `data` property is a flat array. Not sure what that means? Here's a quick example:

- A flat array: `["a", "b", "c", "d", ...]`
- Not a flat array: `["a", "b", ["c", "d"], ...]`

For each pixel of the data read from the context, there are 4 pieces of data pushed onto this array having to do with the color of that pixel: the `red`, `green`, `blue`, and `alpha` values for the color. So, with our image being `200px` wide and `200px` high, this array should have 160,000 pieces of data in it (since 200 x 200 x 4 = 160,000).

With this knowledge, we can loop over `ImageData.data` in increments of 4 and grab each piece of color data to put into our own data structure. We'll be using this newly structured data in the next step. You can reformat this part to whatever makes the most sense to you. Maybe a JSON object is easier to understand. Give it a try! :)

<iframe src="https://codesandbox.io/embed/step4-rql19?fontsize=14&view=split&module=index.js" title="step2" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## 5. Append Some containers

Now we're ready to use our color data! Remember that we've stored them in a 2-dimensional array, so we're going to have to do some nested looping. To continuously display the correct letter of your desired string (I used my name!), we need to keep track of how many letters we've already added to the page. We use the remainder (`%`) operator to wrap through the string multiple times.

There's a bunch of CSS here that makes this code look kind of gross. We _could_ move it out into a CSS file if we don't want to make the `font-size` to work dynamically like I've specified. But for this demonstration, I've made it so you can play around with the size of the font in order to "zoom" in or out of your image. The most important attribute in our CSS is `color`! We'll set this to the `RGBA` values we got in the previous step.

This is going to take a few seconds to render. There's a TON of pixels (160,000)!

<iframe src="https://codesandbox.io/embed/step5-xuw2j?fontsize=14&view=split&module=index.js" title="step2" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## 6. Resources

That's it! Here are some links for you to read through if you have questions about some of the topics we went through. All of them go to the MDN documentation.

- [Remainder (%) Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder)
- [The Graphics Canvas element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)
- [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
- [CanvasRenderingContext2D.getImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData)
- [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)

---

If you've made it this far, congrats!!! 🎉 I hope you found this post helpful and entertaining. If you make something cool out of this, please [send me a tweet](https://twitter.com/ashleemboyer) so I can see it!
