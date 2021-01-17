---
title: Build a Blog Site with Next.js and Firebase Part 1 - Getting Set Up
date: 2021-01-04
description: Learn how to build a blog site with Next.js and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2021%2F01%2FNextFirebasePart1.png?alt=media&token=05dc0570-ae65-4ea5-87e9-3742348bd5ff
tags: [react, nextjs, firebase, web-development]
series_title: Build a Blog Site with Next.js and Firebase
series_slug: nextjs-firebase-blog
---

Welcome to the first post in my new "Build a Blog Site with Next.js and Firebase" series! This series is pretty similar to a series I wrote in 2019: ["Build a React & Firebase Blog Site"](https://ashleemboyer.com/series/react-firebase-blog). Because it's been well over a year since I published that series, I decided to create a new series and use the Next.js React framework this time. It's a fun framework to use, and I know so many people that are curious about it. I hope you enjoy the series!

Part 2 of this series will be published one week from today, Monday, January 11th, 2021. If you'd like to get an email notification when that happens, consider subscribing to my newsletter at [ashleemboyer.com/newsletter](https://ashleemboyer.com/newsletter)! As always, you can contact me through [Twitter](https://twitter.com/ashleemboyer) or [email](mailto:hello@ashleemboyer.com) if you run into any issues.

## Table of Contents

- [Firebase Setup](#firebase-setup)
- [Next.js Setup](#nextjs-setup)
- [Create a Repository and Commit Progress](#create-a-repository-and-commit-progress)
- [Display the Test Data](#display-the-test-data)
- [Deploy to Vercel](#deploy-to-vercel)

<hr />

## Firebase Setup

First, let's create a new project in Firebase. _There's a video after these steps that visually walks though how to do this._

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and make sure you're logged in with the Google account you want to use.
2. Click the card that says "Add project". It should be the first one listed.
3. Enter a project name. I'm going to use `nextjs-firebase-blog` for the entire series.
4. Toggle "Enable Google Analytics for this project" to off.
5. Click "Create project".
6. Click "Continue" when your new project is ready.

<iframe width="100%" height="350" src="https://www.youtube-nocookie.com/embed/2w5BV9ft82g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Now that we have a project, we can set up the database and add some test data to it. _There's a video after these steps that visually walks though how to do this._

1. Click "Realtime Database" in the left-hand sidebar.
2. Click the "Create Database" button.
3. Keep the given location setting and click the "Next" button.
4. Select the "Start in test mode" option.
5. Click the "Enable" button.

<iframe width="100%" height="350" src="https://www.youtube-nocookie.com/embed/DQU0rcHce1c" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Since we won't have an interface for creating new posts until after Part 2 of this series, we need to add some test data to our database. Firebase makes it easy to import data from a JSON file. That's how we're going to add our test data. _There's a video after these steps that visually walks though how to do this._

1. Wherever you store code on your machine, create a new folder for this project. I'm calling mine `nextjs-firebase-blog`.
2. Add a file to it called `data.json`.
3. Paste this block of code in the JSON file:

```json
{
  "posts": {
    "my-first-blog-post": {
      "content": "Cupcake ipsum dolor sit amet carrot cake. Sweet tootsie roll marzipan jelly-o cake cotton candy pie. Jelly-o powder tootsie roll. Toffee gummi bears muffin powder caramels dragée soufflé. Halvah gummies gingerbread jelly jujubes. Sweet toffee lollipop chocolate cake.",
      "coverImage": "http://placekitten.com/g/700/400",
      "coverImageAlt": "A random kitten from PlaceKitten.com",
      "dateCreated": 1609718400000,
      "slug": "my-first-blog-post",
      "title": "My First Blog Post"
    },
    "my-second-blog-post": {
      "content": "Cupcake ipsum dolor sit amet carrot cake. Sweet tootsie roll marzipan jelly-o cake cotton candy pie. Jelly-o powder tootsie roll. Toffee gummi bears muffin powder caramels dragée soufflé. Halvah gummies gingerbread jelly jujubes. Sweet toffee lollipop chocolate cake.",
      "coverImage": "http://placekitten.com/g/700/500",
      "coverImageAlt": "A random kitten from PlaceKitten.com",
      "dateCreated": 1609459200000,
      "slug": "my-second-blog-post",
      "title": "My Second Blog Post"
    }
  }
}
```

4. Go to your Realtime Database in Firebase.
5. Click the vertical ellipsis menu icon. It's to the right of a circle minus sign icon.
6. Select the "Import JSON" menu option.
7. Browse for the `data.json` file you just created.
8. Click the "Import" button.

<iframe width="100%" height="350" src="https://www.youtube-nocookie.com/embed/gWp1Jn9ed5E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Next.js Setup

Let's spend some time in our terminal and code editor now. We need to add some inital packages and files to the same place that we created our `data.json` file in the previous section. The next few steps are commands that need to be run in a terminal, so go ahead and fire it up if you haven't already.

_Make sure you run the commands in steps 1 and 2 in your `nextjs-firebase-blog` directory._

1. `npm init -y` to set up your `package.json` file.
2. `npm install next react react-dom sass firebase` to install all the necessary packages.
3. Open `package.json` in your code editor.
4. Update the `"scripts"` property to have `dev`, `build`, and `start` properties like this:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

5. Add a `pages` directory.
6. Add `_app.js` to the `pages` directory and write this code in it:

```jsx
// This is called a "Custom `App` in Next.js.
// We use it for global styles and will later use it for loading an
// icon library. You can read more about this in the Next.js docs at:
// https://nextjs.org/docs/advanced-features/custom-app

import '@styles/global.scss';

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
```

7. Add a `jsconfig.json` file in the root of the project:

```json
// This file is for absolute imports and module path aliases.
// It'll help us keep our import statements nice and clean!
// You can read more about this in the Next.js docs at:
// https://nextjs.org/docs/advanced-features/module-path-aliases

{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@styles/*": ["styles/*"]
    }
  }
}
```

8. Add a `styles` directory in the root of the project.
9. Add `global.scss` to the `styles` directory:

```scss
// This is where global site styles go.

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
```

10. Add `index.module.scss` to the `styles` directory:

```scss
// These styles go with the index page.

.HomePage {
  padding: 24px;

  h1,
  article {
    max-width: 700px;
    margin: 0 auto;
  }

  h1 {
    margin-bottom: 32px;
  }

  article {
    border: 1px solid black;
    border-radius: 12px;
    overflow: hidden;

    &:not(:last-child) {
      margin-bottom: 32px;
    }

    div {
      padding: 16px;

      h2 {
        margin-top: 0;
        margin-bottom: 4px;
      }

      span {
        display: block;
        margin-bottom: 12px;
      }

      p {
        margin: 0;
      }
    }
  }
}
```

11. Add `index.js` to the `pages` directory:

```jsx
// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import styles from '@styles/index.module.scss';

const HomePage = () => (
  <div className={styles.HomePage}>
    <h1>Hello from HomePage!</h1>
  </div>
);

export default HomePage;
```

12. In your terminal, start the application in development mode with `npm run dev`.
13. Go to [http://localhost:3000](http://localhost:3000) in your browser. It should look like this (mine is zoomed in for visibility):

[![A white webpage that reads "Hello from HomePage!" in black text.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-01%2FCleanShot%202021-01-03%20at%2023.20.21.png?alt=media&token=a9c0cbb2-703d-48c5-8f31-5128830f06b1)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-01%2FCleanShot%202021-01-03%20at%2023.20.21.png?alt=media&token=a9c0cbb2-703d-48c5-8f31-5128830f06b1)

## Create a Repository and Commit Progress

This is a great place to stop and commit because you have a working version of your app. You want this code in a repository for a quite a few reasons:

- A clear commit history is an efficient way to remind yourself what you did.
- You can access the code from multiple machines.
- Other people will be able to see what you've created. ([Learning out loud](https://ashleemboyer.com/what-it-means-to-learn-out-loud) is definitely a good thing!)
- Vercel makes it easy to deploy from GitHub repositories.

1. Go to [https://github.com/new](https://github.com/new)
2. Name your repository `nextjs-firebase-blog`.
3. Add a description like "My awesome blog built with Next.js and Firebase!"
4. Click the "Create repository" button.

_The next few steps will be run in your terminal._

5. `git init` to initialize a Git repository in your project directory.
6. Add a `.gitignore` file so we can avoid adding unnecessary files to the repository:

```gitignore
.next
node_modules
```

7. `git add .` to stage all of your files for a commit.
8. `git commit -m "First commit"` to create the commit and add a message to it.
9. `git branch -M main` to rename the `master` branch to `main`
10. `git remote add origin <shortname>` where `<shortname>` is the one associated with your repository.
11. `git push -u origin main` to push your commits to the repository.
12. Refresh GitHub in your browser and your repository should have all of your code.

[![View of the code repository at GitHub.com.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-01%2FCleanShot%202021-01-04%20at%2000.14.23.png?alt=media&token=ec15ed14-f50d-472a-9b76-066f6a794be1)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-01%2FCleanShot%202021-01-04%20at%2000.14.23.png?alt=media&token=ec15ed14-f50d-472a-9b76-066f6a794be1)

## Display the Test Data

In order to read data from our Firebase Realtime Database, we need to initialize a Firebase app within our site. This will require three config variables that Firebase provides: `apiKey`, `databaseURL`, and `projectId`. We'll store these variables in an environment file and git ignore it so we don't accidentally share secret information with the public.

1. Update your `.gitignore` to include `.env`:

```gitignore
.next
node_modules
.env
```

2. Go to your project settings in the Firebase console.
3. Scroll to the bottom of the page where it says "Your apps."
4. Click the "</>" button to register your app for web.
5. For "App nickname", enter `nextjs-firebase-blog`.
6. Click the "Register app" button and keep this page open.
7. Add a `.env` file in the root of the project and paste your `apiKey`, `databaseURL`, and `projectId` in the correct places:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=<your api key>
NEXT_PUBLIC_FIREBASE_DATABASE_URL=<your database url>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your project id>
```

8. You can leave this page by clicking the "Continue to console" button.
9. Add a `lib` directory in the root of the project.
10. Add a `firebase.js` file:

```js
// This is where we'll add all of the functions for interacting with
// Firebase services in our app.

import firebase from 'firebase/app';
import 'firebase/database';

const initFirebase = async () => {
  // This check prevents us from initializing more than one app.
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
};

// Gets all posts from the database in reverse chronological order.
export const getPosts = async () => {
  // Because our exported functions can be called at any time from
  // any place in our app, we need to make sure we've initialized
  // a Firebase app every time these functions are invoked.
  initFirebase();

  const posts = await firebase
    .database()
    .ref('/posts')
    .orderByChild('dateCreated')
    .once('value')
    .then((snapshot) => {
      const snapshotVal = snapshot.val();

      const result = [];
      for (var slug in snapshotVal) {
        const post = snapshotVal[slug];
        result.push(post);
      }

      return result.reverse();
    });

  return posts;
};
```

11. Update `jsconfig.json` for the new `lib` directory:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@lib/*": ["lib/*"],
      "@styles/*": ["styles/*"]
    }
  }
}
```

12. Import the `getPosts` in `pages/index.js` as the first import:

```jsx
import { getPosts } from '@lib/firebase';
```

13. Below the imports, add a helper function for formatting the date of a post:

```js
const getFormattedDate = (milliseconds) => {
  const formatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  };
  const date = new Date(milliseconds);
  return date.toLocaleDateString(undefined, formatOptions);
};
```

14. After the `HomePage` component initialization and before `export default HomePage`, add `getServerSideProps` for fetching posts from the database:

```js
// This is for fetching data every time the page is visited. We do this
// so that we don't have to redploy the site every time we add a blog post.
// You can read more about this in the Next.js docs at:
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}
```

15. Update the `HomePage` component to accept a `posts` prop and to render the given `posts`:

```jsx
const HomePage = ({ posts }) => (
  <div className={styles.HomePage}>
    <h1>Blog Posts</h1>
    {posts.map((post) => (
      <article key={post.slug}>
        <img src={post.coverImage} alt={post.coverImageAlt} />
        <div>
          <h2>{post.title}</h2>
          <span>{getFormattedDate(post.dateCreated)}</span>
          <p
            dangerouslySetInnerHTML={{
              __html: `${post.content.substring(0, 200)}...`,
            }}
          ></p>
        </div>
      </article>
    ))}
  </div>
);
```

16. Stop the development server if it's running.
17. `npm run dev` to start the development server.
18. Go to [http://localhost:3000/](http://localhost:3000/) in your browser and it should look something like this:

[![The blog site showing a "Blog Posts" heading and a list of two posts showing the test data.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-01%2FCleanShot%202021-01-04%20at%2000.43.45.png?alt=media&token=5574ca53-9e33-49e2-aab0-9b8a8b23f150)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-01%2FCleanShot%202021-01-04%20at%2000.43.45.png?alt=media&token=5574ca53-9e33-49e2-aab0-9b8a8b23f150)

19. You've done quite a bit of work now, so make sure you commit and push it in your terminal:

```bash
git add .
git commit -m "Showing test data on HomePage"
git push
```

## Deploy to Vercel

Woot! We're at the last step! We've got a basic little blog site that lists posts from a Firebase Realtime Database. You should be so proud of yourself. Let's get this deployed to Vercel so you can show it off! _There's a video after these steps that visually walks though how to do this._

1. Go to [vercel.com/new](https://vercel.com/new). You may have to create an account.
2. Find your `nextjs-firebase-blog` repository and click the "Import" button next to it.
3. Select your personal account for the Vercel Scope.
4. Click the "Deploy" button.
5. Wait for the deploy to finish, but don't visit the site just yet.

<iframe width="100%" height="350" src="https://www.youtube-nocookie.com/embed/JyoalVxk0ew" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

6. Go the Project Settings in Vercel.
7. Click Environment Variables from the left-hand sidebar.
8. Scroll down to the "Add New" section.
9. Choose "Plaintext".
10. For the `name`, put `NEXT_PUBLIC_FIREBASE_API_KEY`.
11. For the `value`, enter the value you have for the variable from your `.env` file.
12. Click the "Save" button.
13. Repeat steps 9-12 for the other two variables in your `.env` file: `NEXT_PUBLIC_FIREBASE_DATABASE_URL` and `NEXT_PUBLIC_FIREBASE_PROJECT_ID`.

You should now have 3 environment variables that match the ones in your `.env` file. A deployment is required for these changes to take effect, so let's finish up with that last task. _There's a video after these steps that visually walks though how to do this._

1. Go to your project overview.
2. Scroll to the Production Deployment section.
3. Under "DEPLOYMENT" in that section, click the link. It's the first one listed. You'll be taken to the Overview page for this specific deploy.
4. Click the vertical ellipsis menu directly to the left of the "Visit" button.
5. Choose the "Redploy" menu option.
6. Click the "Redeploy" button in the modal that pops up.
7. Wait for the deploy to finish.
8. Click the "Visit" button when it appears.
9. Celebrate!!! You did it!!! <span role="img" aria-label="party popper emoji">🎉</span>

<iframe width="100%" height="350" src="https://www.youtube-nocookie.com/embed/Tgo8NPEGxis" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
