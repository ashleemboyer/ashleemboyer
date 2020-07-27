---
title: Three Things to Get You Started with Making Accessible Digital Content
date: 2020-07-26
description: Leave this post with straightforward action items for making accessible digital content.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2020%2F07%2F26-three-thigns%2FThree%20Things%20to%20Get%20You%20Started%20with%20Making%20Accessible%20Digital%20Content.png?alt=media&token=72ac6bce-b81e-417e-a3eb-35b13255d99a
tags: [a11y, web development, blogging]
---

Accessibility can be pretty overwhelming at first. There are a lot of things to consider and it's really hard to figure out what you don't know when you're just starting out. I hope you find this short list useful to help your first dive into making accessible digital content. My focus is usually on websites, but a lot of this is good for things like mobile apps, ebooks, and slideshows, too!

## 1. Color Contrast

Ensuring you have a good contrast between text color and background color ensures nearly everyone can consume your content. People with vision disabilities (vision loss or color blindness) need high contrasting colors. Your minimum goal here is to meet contrast standards for normal and large sized text.

My favorite tool for this is the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). You can input your foreground and background text colors and it will tell you how they fare under the WCAG level AA and level AAA standards.

![A screenshot of the WebAIM Contrast Checker in action. It shows the overall contrast ratio of two colors to the right of two inputs, and below that it shows whether the contrast passes level AA and AAA standards for both normal and large sized texts.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2020%2F07%2F26-three-thigns%2FScreen%20Shot%202020-07-26%20at%209.53.28%20PM.png?alt=media&token=aa6423ce-f0b1-4b2d-b43d-bb23765d0c40)

## 2. Alternative Text

Alternative text is also important for people with vision disabilities. There are two ways you can go about alternative text depending on your platform.

When you're making a website by writing your own HTML, writing blog posts, or posting to social media sites like Twitter, you can add alt text to images. In HTML, make sure you're providing an `alt` attribute all `img` elements. When writing blog posts, a lot of blogging platforms will have a text input for you to provide alternative text. On Twitter, you can add alternative text as you're about to tweet an image or GIF.

The previous points are only going to be useful for people using a screen reader. These devices pick up those attributes to present images to the person consuming them. However, not all users with vision disabilities use screen readers. So, if you feel like you'd rather make your alternative text available for everyone, it's common practice to surround an image description in square brackets and preface it with "Image description", like this:

```
[Image description: ...]
```

As for actually writing the image descriptions, that's going to take some practice. Imagine you are sitting socially distanced from a friend and you want to show them a picture you've come across on your phone, but you'd have to break social distance to physically show them. How would you describe the image to them in one or two sentences?

## 3. Semantic HTML

This point is a little more technical, but also useful for folks that use blogging platforms that provide text editors. The main lesson for this section? Use the elements that we have been given for their intended uses.

- Need to display things in a list format? Use a bullet (`<ul>` element) or numbered list (`<ol>` element).
- Have a navigation menu at the top of your site? Use a `<nav>` element.
- Have an element that users can click on to perform an important action? PLEASE use a `<button>` element. 😁

Using semantic HTML elments is so important because they're already able to be presented by assistive devices without much addition. You're going to start adding ARIA roles and properties the minute you start using `<div>`s for `<button>`s, and if you don't know what you're doing there, you can severely and negatively impact a screen reader user's experience.

You can read and practice with HTML semantic elements [here](https://www.w3schools.com/html/html5_semantic_elements.asp), on W3Schools.

---

Did you know I have a newsletter? 📬

If you want to get notified when I publish new blog posts or make major project announcements, head over to https://ashleemboyer.com/newsletter.
