---
title: Accessible, Smooth Scroll-to-top Buttons with Little Code
date: 2020-11-26
description: Adding a scroll to top button with smooth scrolling is as easy as adding 5 lines of code.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2020%2F11%2F26%2FAccessible%2C%20Smooth%20Scroll-to-top%20Buttons%20with%20Little%20Code.png?alt=media&token=1e6ab036-9197-414d-b765-311416189b51
tags: [a11y, css, web-development]
---

Scroll-to-top buttons are great for pages that are long enough to require a few scrolls to read everything. They're even better for extremely long pages. Scrolling is a lot of work for some users, especially on a mobile device. We (website creators) can greatly reduce the amount of work it takes to scroll our pages with surprisingly little effort on our part.

One example is the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1), which is 140,923 pixels tall at the time of this writing. I'm not calling them out, it's just one of my favorite pages on the entire internet! [It's a great resource for making accessible custom components](https://ashleemboyer.com/my-favorite-resource-for-making-accessible-custom-components).

Making a scroll-to-top button and making it scroll smoothly is probably a lot easier than you think. It's definitely a lot easier than _I_ thought! The code bits I'm about to show are for React and SCSS, but you don't need to know either. The basic concepts here are for JavaScript and CSS. We'll also cover how to get rid of the smooth scrolling when it's an accessibility concern.

## The SCSS Code

First, let's make sure this scroll will happen smoothly. To do so, set `scroll-behavior` to `smoothly` in a global stylesheet under the `html` element. The media query I've added is for accessibility. Animations can be distracting or for some users, like myself, have vestibular disorders where animations can cause harmful physical effects. These effects can include dizziness, nausea, and headaches or migraines.

We can prevent this harm to these users who have set up their device to reduce motion by using the `prefers-reduced-motion` CSS media query. Inside of it, we set the `scroll-behavior` to `auto`, which is the default. If you'd like to read more about this technique, it's thoroughly covered in [WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/css/C39).

```scss
html {
  scroll-behavior: smooth;

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
}
```

## The React Code

Now, add a button to the bottom of your page with lots of content. The important line of code here is `window.scrollTo(0, 0)`. This is what will scroll your page to the top. You can read more about this function [on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo).

```jsx
<button
  onClick={() => {
    window.scrollTo(0, 0);
  }}
>
  Scroll to top
</button>
```

## Managing focus

Finally, we must also address focus management when adding a scroll-to-top button to our sites. If we add nothing else to our code from above, the button will still have focus after it is clicked. What this means for users who navigate pages with a keyboard is that the page's focus is not where they expect it to be. They expect it to be at the top of the page when it's not.

In your button's `onClick` listener, after `window.scrollTo(0, 0)`, you need to manually put something at the top of your page in focus. In this article, for example, I can call `focus` on the `<h1>` element containing the article title. We just need to add one thing to that element in order for this to work without interrupting normal keyboard navigation. That thing is `tabindex="-1"`.

My `<h1>` element will then look like this (in React):

```jsx
<h1 id="article-title" tabIndex="-1">
  Accessible, Smooth Scroll-to-top Buttons with Little Code
</h1>
```

And here's what button will look like with this specific example:

```jsx
<button
  onClick={() => {
    window.scrollTo(0, 0);

    // focus management
    const title = document.getElementById('article-title');
    title.focus();
  }}
>
  Scroll to top
</button>
```

## Conclusion

That's it! It really is just a few lines of code. After you add this, everyone will be able to quickly scroll to the top of your website. You've also made it so your site doesn't accidentally harm someone who can't tolerate animations! Well done. I am proud of you!
