---
title: How to Create Your Own Next.js RSS Reader App
date: 2021-05-25
description: Learn how to build your own RSS Reader App with Firebase Authentication and the RSS to JSON API.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F05%2Fcreate-your-own-nextjs-rss-reader-app%2FHowtoCreateYourOwnNextJSRSSReaderApp.png?alt=media&token=73f69a7b-42a5-4fab-aeb6-eff1788aac07
tags: [rss, react, nextjs, firebase, web-development]
---

I recently came across [a tweet from Sara Soueidan](https://twitter.com/SaraSoueidan/status/1390598514774847496) applauding folks who provide an RSS feed on their site. Sara is someone I highly admire in frontend web development and accessibility, but I had so little knowledge of RSS feeds and so many questions:

- What the heck are they?
- What are they for?
- I thought people didn't use them anymore?

If you also have questions like this, I recommend reading [How Do RSS Feeds Work?](https://rss.com/blog/how-do-rss-feeds-work/) right from RSS.com. The first few words really sum it up:

> Imagine being able to log into one dashboard and getting the latest news and events from all of your favorite websites, blogs, or podcasts? With RSS feeds, it’s possible!

RSS feeds mean I can read all of my favorite blogs in one place?? And I don't _have_ to subscribe to newsletters to know when a new post has been published?? That sounds so lovely! I knew then that I definitely needed to figure out how to provide an RSS feed for my own site.

In order to better understand how to create an RSS feed for my site, I needed to better understand how they are used. This is where I got the idea to create my own RSS reader app! Once I had the app finished, it also doubled as a way for me to test my RSS feed as I developed it.

I had a ton of fun with it so I decided to share my findings with y'all in case you also want to make your own RSS reader app. I hope you find the instructions below helpful and as always, let me know on Twitter if you have any questions!

## How to Create Your Own Next.js RSS Reader App

### Fork and clone the repo

First, you need to create a fork of the starter code.

1. Go to [the GitHub repository](https://github.com/ashleemboyer/nextjs-rss-reader-starter)
2. Click the "Fork" button at the top right of the page
3. Follow the steps provided by GitHub

Second, clone the fork you've created onto your machine and install the dependencies.

```bash
git clone <your fork>    # Clones the fork
yarn                     # Installs the dependencies
```

### Set up Firebase Authentication

Third, you need to create a Firebase project since it'll handle authentication. You want this app to have authentication so that other people aren't driving up your API requests that will be made to RSS to JSON (we'll set that up next).

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and make sure you're logged in with the Google account you want to use.
2. Click the card that says "Add project". It should be the first one listed.
3. Enter a project name. I'm going to use `nextjs-rss-reader`.
4. Toggle "Enable Google Analytics for this project" to off.
5. Click "Create project".
6. Click "Continue" when your new project is ready.

Here's a video showing these steps (the project name is different):

<iframe width="100%" height="350" src="https://www.youtube-nocookie.com/embed/2w5BV9ft82g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Firebase makes it easy for us to set up email/password authentication in our app. It's also easy to add a user for ourselves right from the console. Make sure you use a real email address and a secure password for your user. This is how you're protecting your feed!

1. Go to [the Firebase console](console.firebase.google.com) for your project.
2. Go to the "Authentication" page under "Build".
3. Click "Get Started".
4. You should be on the "Sign-in method" tab.
5. Click "Email/Password".
6. Enable the first toggle.
7. Click "Save".
8. Switch to the "Users" tab.
9. Click "Add user".
10. Enter a secure email and password.
11. Click "Add user".

Here's a video showing these steps:

<iframe width="100%" height="350" src="https://www.youtube-nocookie.com/embed/WTnIU0ZtCoo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Create an RSS to JSON account

Next, let's set up an [RSS to JSON](rss2json.com) account so we can get an API key for making API requests. I personally have a paid plan because of the number of feeds I subscribe to, but the free plan is pretty nice! At the time of this writing, the free plan updates a feed once an hour, allows 10,000 requests per day, and supports 25 feeds. The starter code is currently set up to generate your site no more than once per day, so at the very most, you'll be making 1 request per feed per day.

1. Sign up for an RSS to JSON account at [this link](https://rss2json.com/sign-up)
2. Get your API key from [the My Account page](https://rss2json.com/me/api_key) and have it ready for the next step.

### Create a .env file

In the root of your forked project, create a file called `.env`. It will have four items in it.

```env
RSS_2_JSON_API_KEY=<your RSS to JSON api key>
NEXT_PUBLIC_FIREBASE_API_KEY=<your Firebase project's API key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your Firebase project's auth domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your Firebase project ID>
```

Put your RSS to JSON API key from the previous step with the `RSS_2_JSON_API_KEY` item. You can get the other items from Firebase after registering your app. Here are the steps for that:

1. Go to [the Firebase console](console.firebase.google.com) for your project.
2. Go to the project settings.
3. Scroll to the bottom of the page where it says "Your apps."
4. Click the "</>" button to register your app for web.
5. For "App nickname", enter `nextjs-rss-reader`.
6. Click the "Register app" button.
7. Copy and paste the `apiKey`, `authDomain`, and `projectId` values with the last three items in your `.env` file.

### Start the app

We're ready to go! Start the app with `yarn dev` and go to http://localhost:3000/ in your browser. You should be redirected to the login page where you can enter your email and password for the user you created in the second part of the [Set up Firebase Authentication](#set-up-firebase-authentication) section above.

![Browser window screenshot with a background of large, dark green leaves. The window shows a white webpage showing "Log In" text at the top. There is an input for email and password and a gray "Sign In" button.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F05%2Fcreate-your-own-nextjs-rss-reader-app%2Flogin-page.png?alt=media&token=0ec4c0d0-6939-4858-a76d-31bd7d2f5010)

After logging in, you should see a list of articles. You can click the "Read here" links to read the article within your app, or you can click the "Read at source" link to read the original version of the article!

![Browser window screenshot with a background of large, dark green leaves. The window shows a white webpage with black text. The title is "My RSS Reader" and there is a vertical list of articles with thin black borders. Each article first shows the title in large bold text, then the name of the feed, author, and publish date on the next line, then a horizontal rule, and lastly the article's description as HTML.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F05%2Fcreate-your-own-nextjs-rss-reader-app%2Farticles-page.png?alt=media&token=81e422b0-addc-47fe-ae3d-539477222d39)

### Customize your feed

The app knows what feeds to fetch by the `feed.txt` file in the root of the project. If you open the file, you'll see three listed with each one on its own line in the file:

```txt
https://www.a11yproject.com/feed/feed.xml
https://webaim.org/blog/feed/
http://www.webaxe.org/feed/
```

If you want to remove a feed, just delete the line. If you want to add a feed, make sure it's on its own line. That's it! Happy reading. :)
