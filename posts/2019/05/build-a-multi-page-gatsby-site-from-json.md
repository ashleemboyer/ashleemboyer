---
title: Build a Multi-Page Gatsby Site from JSON
date: 2019-05-12
description: Looking for the next thing to try after generating your site with markdown? Try it out with a static JSON file.
image: https://thepracticaldev.s3.amazonaws.com/i/8xlndw3gzhgl9l5v562r.png
tags: [gatsby, web development]
---

I decided to take this approach when I made [https://blackbirthdays.com](https://blackbirthdays.com). Originally, for the month of February, it showed a different person each day for their birthday. So, since there was very static data for the site, I decided to just feed the information into it with a JSON file. I wanted to practice something with Gatsby, so I got to practice [programmatically creating pages from data](https://www.gatsbyjs.org/tutorial/part-seven/) and [using GraphQL for getting data](https://www.gatsbyjs.org/tutorial/part-four/).

I couldn't remember exactly every step for doing this, so [I made a new site](https://ashleemboyer.github.io/colors/) for this post specifically. No worries, I plan on making it way better soon. I hope it can become a helpful tool for looking at text color/background color contrasts eventually. Anyways, here we go!

### 1. Create your project

The easiest step. :) Head over to the [Gatsby tutorials](https://www.gatsbyjs.org/docs/quick-start/) if you have any issues or need help setting things up.

![Terminal commands for setting up a new Gatsby project](https://thepracticaldev.s3.amazonaws.com/i/d89dd76oml8yy3rsepy6.png)

### 2. Create the JSON file

Put a new JSON file in the root directory of your project. I had a little bit of issue with the data structure itself, but I think it just takes practice. It's easier to read data from GraphQL with arrays, so try to put your data into that sort of format.

![How I formatted the color data](https://thepracticaldev.s3.amazonaws.com/i/peuhc2g8ovcrkvoajzj5.png)

### 3. Create a template file

This template file defines how all of your dynamically created pages will be displayed. Cool, huh??! You can read a bit more about this [on Gatsby's site](https://www.gatsbyjs.org/blog/2019-05-02-how-to-build-a-blog-with-wordpress-and-gatsby-part-3/#creating-a-page-template).

![Code for the template file](https://thepracticaldev.s3.amazonaws.com/i/6jbcscj813zgm4ekuyeb.png)

### 4. Make the `gatsby-node.js` file create all the pages

This file should already be in your root directory from the `gatsby new` command from step 1. This is where you implement the `createPages` API function and tell the site about the template file you created in the previous step. On the second line of the screenshot below, I specify the JSON file from step 2.

![Code for the gatsby-node.js file](https://thepracticaldev.s3.amazonaws.com/i/x42s5fslzctbnfrpurs0.png)

### 5. Restart the development server and preview your site

Everything should be good to go at this point and you can start styling. Have at it! Share your results if you give this a try, or let me know if something seems off in any of the steps. Enjoy! :)
