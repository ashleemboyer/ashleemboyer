---
title: "Build a React & Firebase Blog Site: Part 1"
date: "2019-08-26"
description: Learn how to build a blog site with React and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Fheader.png?alt=media&token=bda16bb0-6a59-4216-936c-2d4f24be991b
alt: "Header reading the this blog post's title."
---

Welcome! This is the first in a series of posts that will teach you how to build a blog site using React and Firebase. This one will probably be the longest because there are few things to do to set everything up.

At the end of this post, you'll have learned how to connect your app to Firebase and pull some data from [Firebase's Realtime Database](https://firebase.google.com/docs/database). Next time, we'll set up all of our CRUD (create, read, update, & delete) functions. After that, we'll see what we can do to make an interface on the frontend that will make it easy to call our CRUD functions and easy to create more interesting functions.

Ready to get started? :)

## Table of Contents

1. Sign up for Firebase
2. Create a project
3. Clone the Starter Code
4. Connect Firebase to the Application
5. Add Data to the Database
6. Read from the Database
7. Wrapping Up

---

## 1. Sign up for Firebase

This one is easy! Head over to [Firebase's website](https://firebase.google.com/) and click the "Get started" button. The page looks like this:

![Firebase's home page with a "Get started" button.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Ffirebase-home.png?alt=media&token=44402b1f-339f-4343-817d-952bc6c3bbe4)

You'll be prompted to choose a Google account if you're not already signed in to one. Once you're signed in, you can create a project. Here's what that page will look like if you're brand-new to Firebase:

![The Firebase console where a project can be created.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Ffirebase-welcome.png?alt=media&token=8433b1fc-49ff-42a3-8bb1-21e52cb966be)

## 2. Create a Project

Click the "Create a project" button to begin the three step process. First, you'll be prompted for a project name. I'm naming my project `react-firebase-blog`. You can change your project ID if you want, but going with the automatically generated one is fine too.

![Step 1 of the process.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Fcreate-project-01.png?alt=media&token=c238d4b6-3580-4f3d-9a92-4651cd01662d)

Step 2 asks us if we want to set up Google Analytics for the project. I'm selecting "Not right now". If you choose this option, the process ends here. Otherwise, there's another step

![Step 2 of the process.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Fcreate-project-02.png?alt=media&token=fb748ae2-44fb-4626-ada7-f2b31e73a510)

Click "Create project" and you'll be brought to a loading screen. When it says, "Your new project is ready," click the "Continue" button.

<p style="text-align:center;">
  <img src="https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Fcreate-project-ready.png?alt=media&token=3f419470-28e2-4a07-8b36-92b32f8a5b3a" />
</p>

## 3. Clone the Starter Code

You can clone the starter code by running the following command in a terminal:

```
git clone https://github.com/ashleemboyer/react-firebase-blog-starter.git
```

Let's see what we've got! Go ahead and get the project rolling by changing into the `react-firebase-blog-starter` directory and running `npm run start`. Here's what you should see:

![](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Fstarter-site.png?alt=media&token=a0e21d1e-a951-4871-a98f-a9c42f588697)

Hooray! Go ahead and explore the project a little. I'll highlight a few areas for you to begin.

1. `src/App.js`

   We have 4 `Routes`: the home page, a 404, and another for handling blog post slugs (aka URLs). You might be wondering why there's not one for handling non-matching paths. Good catch! We're actually handling that in the `Post` component (`src/pages/post.js`). Let's go ahead and look at that one.

2. `src/pages/post.js`

   Because we're using a Router in `src/App.js` (comes from `react-router-dom`), the components we name in `Route` elements will have a [`match`](https://reacttraining.com/react-router/web/api/match) passed into their props. We can get the slug for a post from the URL bar with `match.params.slug`, then compare that to a list of slugs we support on the site. Those are hard-coded into a `postSlugs` variable for now. If the slug does not exist, we return a `Redirect` to our 404 page. Otherwise, we'll display the correct post.

3. `src/pages/home.js`

   First, you'll se the `blogPosts` variable. We're hard-coding our posts until we connect our app to Firebase. All this page does is return a `section` element for every blog post in the `blogPosts` array. You shouldn't need to change anything after the `return` statement as we make our way through this series.

## 4. Connect Firebase to the application

First, install the [`firebase` package](https://www.npmjs.com/package/firebase) by running `npm install firebase` in the root directory of the project.

Now, create a JavaScript file in the `src` directory of the project and call it `firebase.js`. This is where we'll define our Firebase configs and initialize the Firebase objects.

Before we add some code to this file, let's get the config data we need about our Firebase project. Go to the Firebase project settings by clicking the settings gear in the left sidebar and selecting "Project settings" from the menu. Scroll down to the "Your apps" section of the page. It's probably at the bottom. It should say, "There are no apps in your project."

<p style="text-align:center;">
  <img alt="Screenshot of the 'Your apps' section of the project settings." src="https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Fproject-settings.png?alt=media&token=63cb601f-0eb7-49eb-a7c9-dbb5f6bf53ac" />
</p>

Click the circle that looks like `</>` in order to add Firebase to a web app. You'll be prompted for the App's nickname. I'm calling mine `React Firebase Blog`.

<p style="text-align:center;">
  <img alt="Screenshot of the prompt for the app's nickname." src="https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Fapp-nickname.png?alt=media&token=513f98b4-37ef-42aa-b45f-f793e5e37c6c" />
</p>

Click the "Register app" button, and after the page finishes loading, you'll see some HTML code that has a variable called `firebaseConfig`. Copy the JSON attributes from that variable and hold on to them for our `firebase.json` file. Click the "Continue to console" button to get back to your project settings. If you lose the JSON attributes you copied previously, you can find them again here, under the "Your apps" section that now has our app listed.

Let's go back to our `firebase.js`. Have your config data ready and plug it in to the following code:

```
import firebase from "firebase/app";
import database from "firebase/database";

const config = {
  apiKey: "<YOUR-API-KEY>",
  authDomain: "<YOUR-AUTH-DOMAIN>",
  databaseURL: "YOUR-DATABASE-URL",
  projectId: "<YOUR-PROJECT-ID>",
  storageBucket: "<YOUR-STORAGE-BUCKET>",
  messagingSenderId: "<YOUR-MESSAGE-SENDER-ID>",
  appId: "<YOUR-APP-ID>",
};

let firebaseCache;

export const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache;
  }

  firebase.initializeApp(config);
  firebaseCache = firebase;
  return firebase;
};
```

The `getFirebase()` function will ensure we only call `initializeApp` one time.

## 5. Add Data to the Database

We can't read any data from our database until we actually add to it! Go back to your Firebase project and click the "Database" option under the "Develop" heading in the sidebar. You'll have to scroll down the page a little until you find the "Realtime Database" section.

![Screenshot of the Realtime Database section.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Frealtime-database.png?alt=media&token=2bc78aa3-e902-46fd-a775-95042cd5cc0e)

Click the "Create database" button within this section. You'll see a modal come up asking you about the security rules for your database.

<p style="text-align:center;">
  <img alt="The 'security rules' modal." src="https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Fsecurity-rules.png?alt=media&token=fbd9e6fc-63ac-41d3-b8c9-779a9224c598" />
</p>

Select "Start in **test mode**" and click the "Enable" button. Your database will be empty and read something like:

```
<YOUR-PROJECT-ID>: null
```

If you didn't already know, the Realtime Database is just a JSON object. You can read more about that [here](https://firebase.google.com/docs/database).

The quickest way to get started is to import data using a JSON file. I'm also providing this for you in case you're following along closely and want to have the same things show as what I have here. You can find this file in the root directory of the starter project. Click the three dots menu and select "Import JSON" to get to the file upload. Browse for your file, and then click the "Import" button.

Now you should have some data attributes you can expand and explore!

<p style="text-align:center;">
  <img alt="The data imported into the Realtime Database." src="https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-01%2Fdata.png?alt=media&token=70461f67-df46-41b4-b15a-c53fc343d3b4" />
</p>

## 6. Read from the Database

Finally! The moment we've all been waiting for. Let's head over to `src/home.js` and see if we can get some stuff from the database!

First, add some imports to the top of the file:

```
// You only need to add the `{ useState }` portion here.
import React, { useState } from "react";

// This is new.
import { getFirebase } from "../firebase";
```

Now, let's get `blogPosts` into a state and try to read them from the database. You can read more about the `useState` hook over [here](https://reactjs.org/docs/hooks-state.html). Replace the `blogPosts` constant with the following code:

```
const [blogPosts, setBlogPosts] = useState([]);

getFirebase()
  .database()
  .ref("/posts")
  .orderByChild("date")
  .once("value")
  .then(snapshot => {
    let posts = [];
    const snapshotVal = snapshot.val();
    for (let slug in snapshotVal) {
      posts.push(snapshotVal[slug]);
    }

    const newestFirst = posts.reverse();
    setBlogPosts(newestFirst);
  });
```

Tada! You should see the exact same thing we had before. 🎉

## 7. Wrapping Up

There was a ton of stuff here. If you have any questions or concerned, please [send me an email](mailto:hello@ashleemboyer.com) or [DM me on Twitter](https://twitter.com/ashleemboyer)! I'll try to give you a hand if you're feeling stuck or overwhelmed. Stay tuned for tomorrow's post where we will cover writing CRUD functions for our new, fancy blog site! If you're feeling squirrely and want to give it a go before then, I encourage you to check out the [Firebase documentation](https://firebase.google.com/docs/database/web/start).
