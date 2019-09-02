---
title: "Build a React & Firebase Blog Site: Part 3"
date: "2019-09-02"
description: Learn how to build a blog site with React and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-03%2Fheader.png?alt=media&token=f3be5439-bc89-41b0-bf69-79f96cf879ec
alt: "Header reading the this blog post's title."
---

We've reached the third part of our React & Firebase series. In [part one](https://ashleemboyer.com/react-firebase-blog-01), we learned how to set everything up. [Last time](https://ashleemboyer.com/react-firebase-blog-02), we made a page for creating new blog posts. Today, we're going to read single posts from our Firebase Realtime Database and show them in our app.

If you haven't read the first two posts, I have some starter code you can use instead. Just make sure you follow steps 1, 2, & 5 from [the first part](https://ashleemboyer.com/react-firebase-blog-01) before you go any further.

## Table of Contents

1. Clone the (Part 3) Starter Code [Optional]
2. Inspect the `Post` Component
3. Connect the `Post` Component to Firebase
4. Wrapping Up

---

## 1. Clone the (Part 3) Starter Code [Optional]

Skip this step if you've successfully completed Part 2. Otherwise, you can clone the code by running the following command in the terminal:

```
git clone https://github.com/ashleemboyer/react-firebase-blog-starter-part-3.git
```

You'll need to change one file before continuing: `src/firebase.js`. If you open it, you'll see the following `config` constant:

```
const config = {
  apiKey: "<YOUR-API-KEY>",
  authDomain: "<YOUR-AUTH-DOMAIN>",
  databaseURL: "<YOUR-DATABASE-URL>",
  projectId: "<YOUR-PROJECT-ID>",
  storageBucket: "<YOUR-STORAGE-BUCKET>",
  messagingSenderId: "<YOUR-MESSAGE-SENDER-ID>",
  appId: "<YOUR-APP-ID>"
};
```

The attributes within the constant are used to connect your app to your Firebase project. To find these values, go to your project settings using through the gear icon in the left sidebar of the [Firebase console](https://console.firebase.google.com). Scroll down to the "Firebase SDK snippet" under "Your apps" and copy the attributes from what they're calling `firebaseConfig`. Replace the attributes in your `config` constant with these values.

Now you can run `npm install` and then `npm run start` to see your project in a browser.

## 2. Inspect the `Post` Component

You can find this component in the `src/pages/post.js` file. Let's take a look at what it does right now.

First, it grabs the slug from the URL using the `Router` we have set up in `src/App.js`. Components passed in to `Route` components within a `Router` have a `match` prop sent to them. There are other ways this prop is sent to components, and you can read more about that [over here](https://reacttraining.com/react-router/web/api/match).

Next, we have a `postSlugs` constant which is an array of slugs that exist with a real blog post. If you look at the database, these match the slugs we've given to the first and second blog posts. The problem is that this code isn't dynamic and it's also not connected to the database. We'll come back to this in a few.

Next, we're checking if the `slug` in the URL bar is one of the `postSlugs`. If it isn't, then the user is trying to see a post that doesn't actually exist. So, we return a `Redirect` to our `404` component. You can read more about the `Redirect` [over here](https://reacttraining.com/react-router/web/api/Redirect).

Finally, we have our return statement. Right now, it returns the same thing for every valid post `slug`. Instead, we want to show the real blog post content that we have stored in Firebase.

## 3. Connect the `Post` Component to Firebase

First, let's add import our `getFirebase` function so we can try to read from the database. While we're at it, we should also import `useState` to help manage a couple of things.

```
import React, { useState } from "react";

import { getFirebase } from "../firebase";
```

Next, let's think about how what we want to manage with `useState`. The first thing that comes to mind is a `loading` state. This will be a boolean that describes whether or not we are trying to load something from the database. We also want a variable for our `currentPost` that we're trying to read from the database. Replace the `postSlugs` line with the following two lines of code:

```
const [loading, setLoading] = useState(true);
const [currentPost, setCurrentPost] = useState();
```

We want to start in a loading state so the page can show something different to indicate to a user that the page is loading. You can show an animation, GIF, plain text, whatever you please. We'll keep it simple for now and just return some text like this:

```
if (loading) {
  return <h1>Loading...</h1>;
}
```

Our database call needs to go right before this `if` statement, however. If we place it after, it will never be reached because the `if` statement is making the code return early. Here's what we'll add after our calls to `useState` and before the `if` statement we just wrote:

```
if (loading && !currentPost) {
  getFirebase()
    .database()
    .ref()
    .child(`/posts/${slug}`)
    .once("value")
    .then(snapshot => {
      if (snapshot.val()) {
        setCurrentPost(snapshot.val());
      }
      setLoading(false);
    });
}
```

Let's update our check on whether a post exists or not. Update `postDoesNotExist` to the following:

```
const postDoesNotExist = !currentPost;
```

These conditions might be a little confusing at first. What are we checking for? It might help to list the steps of execution here, which you can play around with yourself by adding some console logs to the file.

1. On first load: `loading` is true and `setCurrentPost` is undefined, so we go inside of the `if` statement. Once we make it into the `then`, if `snapshot.val()` returns an object (it'll be null if no post exists with the given `slug`), we call `setCurrentPost`, making `currentPost` no longer undefined.
2. After `setCurrentPost` call: Making this call will re-render the component. We reach our `if (loading && !currentPost)` statement again. Since `currentPost` is now defined, we do not go in the code block again, thus keep ourselves from unnecessarily making calls to the database. We reach the `if (loading)` statement. `loading` is still true, so the component returns some text and doesn't do anything else.
3. After `setLoading` call: Making this call will re-render the component. `loading` is now false and `currentPost` might be undefined or an object. That's where the `if (postDoesNotExist)` check comes in. If we didn't get a post back from the database, we return a `Redirect`, like before. Otherwise, we continue on to our final `return` where we show the post.

_I hope these steps aren't overwhelming and they help you see the power of hooks and state management! They're some of the coolest things about React, to me._

Here's how I'm displaying posts:

```
return (
  <>
    <img src={currentPost.coverImage} alt={currentPost.coverImageAlt}>
    <h1>{currentPost.title}</h1>
    <em>{currentPost.date}</em>
    <p dangerouslySetInnerHTML={{ __html: currentPost.content }}></p>
  </img>
);
```

I also added a `12px` margin to the top of `<p>` elements in `src/index.js`.

Now, when you click a "Continue reading..." link or manually navigate to one of your posts, you should see something like this:

![Screenshot of a single blog post's page.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Freact-firebase-blog%2Fpart-03%2Fpost.png?alt=media&token=4a9abd6a-9549-467f-a473-ff86ae47357a)

## 4. Wrapping Up

Hooray! You made it through another part of the series. Next time, we'll cover updating and deleting posts. Those should both be more straightforward than what we've covered this far, and good news! We already have part of the work done for making updates with the `Create` component from [part two](https://ashleemboyer.com/react-firebase-blog-02).

Please [send me an email](mailto:hello@ashleemboyer.com) or [a Twitter DM](https://twitter.com/ashleemboyer) if you have any questions or concerns. I love hearing from you! 😊
