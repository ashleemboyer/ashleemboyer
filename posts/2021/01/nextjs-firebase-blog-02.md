---
title: Build a Blog Site with Next.js and Firebase Part 2 - Creating New Posts
date: 2021-01-11
description: Learn how to build a blog site with Next.js and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2021%2F01%2FNextFirebasePart2.png?alt=media&token=e8ddd3ae-2eb6-4ef1-bab2-5f082c61bed4
tags: [react, nextjs, firebase, web-development]
series_title: Build a Blog Site with Next.js and Firebase
series_slug: nextjs-firebase-blog
---

Welcome to the second post in my new "Build a Blog Site with Next.js and Firebase" series! This series is pretty similar to a series I wrote in 2019: ["Build a React & Firebase Blog Site"](/series/react-firebase-blog). Because it's been well over a year since I published that series, I decided to create a new series and use the Next.js React framework this time. It's a fun framework to use, and I know so many people that are curious about it. I hope you enjoy the series!

<a href="/nextjs-firebase-blog-01" style="width:fit-content;margin:40px auto;display:block;text-align:center;background-color:#c2185b;color:white;padding:8px 20px;border-radius:50vw;text-decoration:none;">Read Part 1 of the "Build a Blog Site with Next.js and Firebase" series</a>

Part 3 of this series will be published one week from today, Monday, January 18th, 2021. If you'd like to get an email notification when that happens, consider subscribing to my newsletter at [ashleemboyer.com/newsletter](/newsletter). As always, you can contact me through [Twitter](https://twitter.com/ashleemboyer) or [email](mailto:hello@ashleemboyer.com) if you run into any issues.

## Table of Contents

- [Add a Page for Creating Posts](#add-a-page-for-creating-posts)
- [Make a Form for Describing Posts](#make-a-form-for-describing-posts)
- [Write a Firebase Create Function](#write-a-firebase-create-function)

<hr />

## Add a Page for Creating Posts

First, let's add styles and a minimal component for our new `CreatePage` component.

1. Add `create.module.scss` in the `styles` directory:

```scss
.CreatePage {
  padding: 24px;

  form {
    max-width: 700px;
    margin: 0 auto;
    padding: 16px;

    h1 {
      margin-top: 0;
      margin-bottom: 24px;
    }

    input {
      margin-bottom: 16px;
    }

    textarea {
      height: 300px;
    }

    button {
      display: block;
      margin-right: 0;
      margin-left: auto;
      margin-top: 24px;
    }
  }
}
```

2. Add `create.js` in the `pages` directory:

```jsx
import styles from './create.module.scss';

const CreatePage = () => (
  <div styles={className.CreatePage}>
    <h1>Hello, from CreatePage!</h1>
  </div>
);

export default CreatePage;
```

3. Go to [http://localhost:3000/create](http://localhost:3000/create) in your browser. There's not much here because we first want to check that the files we've added work correctly before we add too much functionality. It should look like this:

[![A white webpage that reads "Hello from CreatePage!" in black text.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-02%2FCleanShot%202021-01-10%20at%2014.13.47.png?alt=media&token=fb6d2174-34f6-4cc6-bf74-f23bbac592f9)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-02%2FCleanShot%202021-01-10%20at%2014.13.47.png?alt=media&token=fb6d2174-34f6-4cc6-bf74-f23bbac592f9)

4. Commit and push your work to your repository:

```
git add .
git commit -m "Adding basic CreatePage component"
git push
```

## Make a Form for Describing Posts

Now that we've successfully added a page for creating posts, we can add a handful of inputs we'll use to describe posts. Let's review what attributes our posts have so we can decide what inputs we need. You can double-check the "shape" of posts by opening up your Firebase Realtime Database and expanding the objects in it. You should see these attributes (they're listed in alphabetical order in Firebase):

- `title`
- `slug`
- `dateCreated`
- `coverImage`
- `coverImageAlt`
- `content`

Of all of these attributes, there's one we can auto-generate when that "Create" button is clicked and don't need an input for: `dateCreated`. The rest need to be text `<input>`s and the `content` attribute will need a `<textarea>` so it's easy to write a lot of text. Let's add some styles for these new controls we're adding and then add them to the `CreatePage`.

1. Add styles for the new elements we're adding to the end of `styles/global.scss`:

```scss
label,
input,
textarea {
  display: block;
  width: 100%;
}

label {
  margin-bottom: 4px;
}

input,
textarea {
  padding: 4px;
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid black;
  border-radius: 4px;
}

button {
  background-color: #1a73e8;
  border: 1px solid #1a73e8;
  border-radius: 4px;
  padding: 8px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
```

2. Add some event handler functions and a `<form>` with the `<input>`, `<textarea>`, and `<button>` elements we need to `CreatePage`:

```jsx
import { useState } from 'react';
import styles from '@styles/create.module.scss';

const CreatePage = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    slug: '',
    coverImage: '',
    coverImageAlt: '',
    content: '',
  });

  /*
  This is the function we're passing to each control so we can capture
  the value in it and store it in our `formValues` variable.
  */
  const handleChange = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;

    setFormValues({ ...formValues, [id]: newValue });
  };

  /*
  This function is passed to the <form> and specifies what happens when
  the form is submitted. For now, we're going to log our `formValues`
  to verify that they are being managed correctly.
  
  Side note: we do not need to set an `onClick` for the <button> at the
  end of the form because it has type="submit". This allows us to click
  to submit the form or press the Enter key to submit it.
  */
  const handleSubmit = (e) => {
    // This prevents the default functionality of submitting a form
    e.preventDefault();

    console.log(formValues);
  };

  return (
    <div className={styles.CreatePage}>
      <form onSubmit={handleSubmit}>
        <h1>Create a new post</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={formValues.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            value={formValues.slug}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            id="coverImage"
            type="text"
            value={formValues.coverImage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="coverImageAlt">Cover Image Alt</label>
          <input
            id="coverImageAlt"
            type="text"
            value={formValues.coverImageAlt}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={formValues.content}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePage;
```

3. Enter some data into each of the controls. Here's a list of what I'm entering as an example:

- `title`: My Third Blog Post
- `slug`: my-third-blog-post
- `coverImage`: https://placekitten.com/g/700/300
- `coverImageAlt`: A random kitten from PlaceKitten.com.
- `content`: Check me out! I'm writing my third blog post on a site I created. I'm so proud of myself!

4. Click the "Create" button.
5. Check the dev tools console.
6. Your page and console should look like this:

[![Window showing the create page and inputs on the left and the dev tools console on the right. The console shows an expanded JSON object with the form values correctly stored.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-02%2FCleanShot%202021-01-10%20at%2014.52.21.png?alt=media&token=55cb793a-714e-4664-b67e-c2d8ddd3495a)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-02%2FCleanShot%202021-01-10%20at%2014.52.21.png?alt=media&token=55cb793a-714e-4664-b67e-c2d8ddd3495a)

7. Commit and push your work to your repository:

```
git add .
git commit -m "Adding form and controls to CreatePage"
git push
```

## Write a Firebase Create Function

Our `CreatePage` component captures all the data we need to create a post. Now, we need to do something with that data.

1. Add a `createPost` function to `lib/firebase.js`:

```js
/*
Creates a new post under /posts in the Realtime Database. Automatically
generates the `dateCreated` property from the current UTC time in milliseconds.
*/
export const createPost = async (post) => {
  initFirebase();

  const dateCreated = new Date().getTime();
  post.dateCreated = dateCreated;

  return firebase.database().ref(`/posts/${post.slug}`).set(post);
};
```

2. Update the `CreatePage` component for fully creating posts. The code after this list of changes shows what your component should look like after making the updates.

- Import `useRouter` from `next/router` after the `useState` import.
- Import `createPost` from `@lib/firebase` after the `useRouter` import.
- Instantiate the `router` at the top of the `CreatePage` function.
- Add an `isLoading` state after the `formValues` instantiation.
- Update `handleSubmit` to check for missing values, set the `isLoading` state, and call `createPost`.
- Update the submit `<button>` to use `isLoading`.

```jsx
import { useState } from 'react';
import { useRouter } from 'next/router'; // this is new
import { createPost } from '@lib/firebase'; // this is new
import styles from '@styles/create.module.scss';

const CreatePage = () => {
  const router = useRouter(); // this is new
  const [formValues, setFormValues] = useState({
    title: '',
    slug: '',
    coverImage: '',
    coverImageAlt: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false); // this is new

  /*
  This is the function we're passing to each control so we can capture
  the value in it and store it in our `formValues` variable.
  */
  const handleChange = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;

    setFormValues({ ...formValues, [id]: newValue });
  };

  /*
  This function is passed to the <form> and specifies what happens when
  the form is submitted. For now, we're going to log our `formValues`
  to verify that they are being managed correctly.
  
  Side note: we do not need to set an `onClick` for the <button> at the
  end of the form because it has type="submit". This allows us to click
  to submit the form or press the Enter key to submit it.
  */
  const handleSubmit = (e) => {
    // This prevents the default functionality of submitting a form
    e.preventDefault();

    // Check if there are any missing values.
    let missingValues = [];
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key);
      }
    });

    // Alert and prevent the post from being created if there are missing values.
    if (missingValues.length > 1) {
      alert(`You're missing these fields: ${missingValues.join(', ')}`);
      return;
    }

    // Update the isLoading state.
    setIsLoading(true);

    // Start the attempt to create a new post.
    createPost(formValues)
      .then(() => {
        // Update the isLoading state and navigate to the home page.
        setIsLoading(false);
        router.push('/');
      })
      .catch((err) => {
        // Alert the error and update the isLoading state.
        alert(err);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.CreatePage}>
      <form onSubmit={handleSubmit}>
        <h1>Create a new post</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={formValues.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            value={formValues.slug}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            id="coverImage"
            type="text"
            value={formValues.coverImage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="coverImageAlt">Cover Image Alt</label>
          <input
            id="coverImageAlt"
            type="text"
            value={formValues.coverImageAlt}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={formValues.content}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
```

3. Fill out the form with data such as this:

- `title`: My Third Blog Post
- `slug`: my-third-blog-post
- `coverImage`: https://placekitten.com/g/700/300
- `coverImageAlt`: A random kitten from PlaceKitten.com.
- `content`: Check me out! I'm writing my third blog post on a site I created. I'm so proud of myself!

4. Click the "Create" button.
5. When it's finished loading, you should see the home page and your new post at the top of the list.

[![Window showing the home page and list of blog posts.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-02%2FCleanShot%202021-01-10%20at%2015.22.04.png?alt=media&token=b2c47ab7-43e9-42bd-9454-ed33f8a8d4e2)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-02%2FCleanShot%202021-01-10%20at%2015.22.04.png?alt=media&token=b2c47ab7-43e9-42bd-9454-ed33f8a8d4e2)

6. Commit and push your work to your repository:

```
git add .
git commit -m "Adding createPost function and using it in CreatePage"
git push
```

6. Celebrate!!! You did it!!! <span role="img" aria-label="party popper emoji">🎉</span>

Don't forget that [last time](/nextjs-firebase-blog-01), we [deployed our site to Vercel](/nextjs-firebase-blog-01#deploy-to-vercel). With every `git push` we've done, Vercel has re-built your site for you! It's already updated and you can share your progress with everyone you know. :)
