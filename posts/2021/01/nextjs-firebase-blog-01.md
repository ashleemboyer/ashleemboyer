---
title: Build a Blog Site with Next.js and Firebase Part 1 - Getting Set Up
date: 2021-01-04
description: Learn how to build a blog site with Next.js and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2021%2F01%2FNextFirebasePart1.png?alt=media&token=05dc0570-ae65-4ea5-87e9-3742348bd5ff
tags: [react, nextjs, firebase, web-development]
series_title: Build a Blog Site with Next.js and Firebase
series_slug: nextjs-firebase-blog
---

# Firebase Setup

## Create a project

- console.firebase.google.com
- click "add project"
- enter a project name (nextjs-firebase-blog)
- toggle "Enable Google Analytics for this project" to off
- click "Create project"
- Click "continue" when new project is ready

## Create a Realtime Database

- click "Realtime Database"
- click "Create Database"
- click "Next"
- select "Start in test mode"
- Click "Enable"

## Add some test data

- create a file in the root directory called data.json
- paste this:

```
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

- click the vertical ellipsis menu
- select "Import JSON"
- browse for your data.json file
- click "Import"

# Next.js Setup

## Add packages and scripts

- `mkdir nextjs-firebase-blog`
- `cd nextjs-firebase-blog`
- `npm init -y`
- `npm install next react react-dom sass firebase`
- add these to "scripts" in `package.json`:
  ```
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
  ```

## Create first pages

- add `pages` directory
- add `_app.js` file:

```
import "../stylesheets/global.scss";

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
```

- add `jsconfig.json` for absolute imports:

```
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@lib/*": ["lib/*"]
    }
  }
}
```

- add `styles` directory
- add `global.scss`:

```
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
```

- add `index.module.scss` to `pages` directory:

```
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

- add `index.js` to `pages`:

```
import styles from './index.module.scss';

const HomePage = () => <h1 className={styles.HomePage}>Hello from HomePage!</h1>;

export default HomePage;
```

- `npm run dev`
- go to http://localhost:3000 in browser (show image)

# Create repo and commit progress

- `git init`
- add `.gitignore`:

```
.next
node_modules
```

- `git add .`
- `git commit -m "Initial commit"`

# Read and display the test data

## Firebase config & environment variables

- add `.env`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

- update `.gitignore`:

```
.next
node_modules
.env
```

- go back to firebase console
- click settings gear
- select "Project settings"
- scroll down to "Your apps" at the bottom
- click the "</>" button
- enter App nickname like "Next.js Firebase Blog"
- click "Register App"
- copy values into `.env`
- click "Continue to console"

- add `lib` directory
- add `firebase.js` file:

```
import firebase from "firebase/app";
import "firebase/database";

const initFirebase = async () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
};
```

- `git commit -m "Configuring firebase app"

## Create a function for reading data

- add `getPosts`:

```
export const getPosts = async () => {
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

      return result;
    });

  return posts;
};
```

- `git commit -m "Adding getTestData function"`

## Use the function in HomePage

- import `getPosts` in `index.js`
- add a function for formatting the date:

```
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

- add a loading state
- add a state for data
- add a `useEffect` for calling `getPosts`

```
useEffect(() => {
  setIsLoading(true);
  getPosts().then((res) => {
    setPosts(res);
    setIsLoading(false);
  });
}, []);
```

- show loading text if loading:

```
if (isLoading) {
  return <h1>Loading...</h1>;
}
```

- otherwise, map over the posts and render them:

```
return (
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

- restart dev server (show browser)
- `git commit -m "Showing test data in HomePage"`
