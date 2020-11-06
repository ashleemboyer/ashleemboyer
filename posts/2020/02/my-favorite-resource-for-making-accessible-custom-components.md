---
title: My Favorite Resource for Making Accessible Custom Components
date: 2020-02-07
description: Want to make your components accessible but not sure about the technical feasibility or how to get started? Take a look at the WAI-ARIA Authoring Practices by W3C!
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2020%2F02%2FMy%20Favorite%20Resource%20for%20Making%20Accessible%20Custom%20Components.png?alt=media&token=fa982680-b3b2-4a27-a1b3-63c23db8da4e
tags: [a11y]
---

I'll admit: making web apps accessible can be challenging, especially when you're new to it. It requires thinking from the perspective of disabled users and having some knowledge about the assistive tools they use, such as screen readers. You may also feel overwhelmed when you start reading documentation. There is a ton of information out there! So I'm going to share with you my favorite resource that I use when making accessible custom components and I'll also tell you about how I like to use it.

# W3C's WAI-ARIA Authoring Practices

If you don't already know, W3C (The World Wide Web Consortium) is "an international community that develops open standards to ensure the long-term growth of the Web." They have an initiative called The Web Accessibility Initiative (WAI), which provides "strategies, standards, and resources" for making the web more accessible to disabled people. There is a wealth of information here and it's easy to get overwhelmed by it. That's why I recommend starting with the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/) when you're ready to start looking at some technical documentation on accessibility.

![Screenshot of the WAI-ARIA Authoring Practices webpage.](https://dev-to-uploads.s3.amazonaws.com/i/n12gavis3ns73vbhfx7i.png)

## What you'll find

There are 9 sections. I use the third section the most.

- **Introduction:** Talks about the purpose of the document and what will be discussed throughout.

- **Read Me First:** Covers a couple of ARIA principles, the importance of testing assistive technologies, and warns that the document doesn't cover mobile and touch support.

- **Design Patterns and Widgets:** Shows how to make accessible "widgets" (or components) using WAI-ARIA roles, states, and properties and has requirements for implementing keyboard support. There are 27 examples!

- **Landmark Regions:** Introduces HTML sectioning elements and ARIA landmark roles and explains how they help assistive technology users understand how a web page is laid out.

- **Providing Accessible Names and Descriptions:** Talks about the purpose of accessible names and descriptions, when to use them, how browsers assemble them, and rules for making them.

- **Developing a Keyboard Interface:** Covers the principles of coding keyboard support and why it's important.

- **Grid and Table Properties:** Talks about the ARIA properties that help make grids and tables accessible and how to use them.

- **Intentionally Hiding Semantics with the `presentation` Role:** Discusses what the `presentation` role does and when it's commonly used.

- **Roles That Automatically Hide Semantics by Making Their Descendants Presentational:** Lists the roles/elements that make all of their children have the previously discussed `presentation` role.

## How I use it

Section 3, "Design Patterns and Widgets", is my favorite and the one I read the most. There are so many widgets discussed! Let's look at [the Button subsection](https://www.w3.org/TR/wai-aria-practices/#button) as an example.

Each section starts by explaining what the widget does and what it's used for. If there are multiple types of the widget, it'll briefly cover those too. There are 2 additional types of buttons supported by WAI-ARIA: toggle and menu. I use this section to fully understand the functionality of a widget and also to learn any new terminology I should be using when documenting my own components.

![Screenshot of the first section of the Button widget.](https://dev-to-uploads.s3.amazonaws.com/i/3rhs8nantuv03eua50ia.png)

Sometimes there will be NOTE sections that discuss caveats or additional resources. The one for this widget discusses cases when links need to look like buttons or when buttons need to function like links.

![Screenshot of the note for the Button widget.](https://dev-to-uploads.s3.amazonaws.com/i/zlp5ppilfkehbqpliufj.png)

Next up, there will be a list of links to examples. [The Button widget examples](https://www.w3.org/TR/wai-aria-practices/examples/button/button.html) show how to correctly make a `div` element a button and a toggle button created with an `a` element. I like to read the code examples then use them as a reference when I make a rough initial version of the component in a code sandbox. Making an isolated practice copy prevents any unexpected behavior caused by my codebase and I can do manual testing with assistive technologies with ease.

![Screenshot of the examples section for the Button widget.](https://dev-to-uploads.s3.amazonaws.com/i/tynhp8eh33i2laie7rmb.png)

After that, there's a section about keyboard interaction. For the Button widget, it explains that `Space` and `Enter` activate the button and then goes into deep detail about what happens to focus based on the action performed by the button. The format of this section usually makes it very straightforward to come up with a todo list of what I need to code to make a component accessible to keyboard interaction.

![Screenshot of the keyboard interaction section for the Button widget.](https://dev-to-uploads.s3.amazonaws.com/i/r39znxw9eupjd1apt3nd.png)

Finally, you'll come across a section about the WAI-ARIA roles, states, and properties associated with the component. Like the previous section, it's formatted in such a way that lets me test the effects of each role, state, or property one-by-one in my isolated code sandbox. There are also links to the main documentation for each which I use to better understand their purpose.

![Screenshot of the WAI-ARIA roles, states, and properties section for the Button widget.](https://dev-to-uploads.s3.amazonaws.com/i/x5ntbkr93815gs4y3m3p.png)

## Good luck, and have fun!

When I am approaching something new and potentially daunting, I always try to keep the mentality that the experience will be a fun challenge. It's totally okay if you don't get it right on your first try! That's how coding works in general. It takes practice and patience.

If you ever want to chat with me about accessibility, send me a DM or tweet on Twitter! I love a good accessibility conversation. :)
