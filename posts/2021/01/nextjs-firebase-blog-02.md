---
title: Build a Blog Site with Next.js and Firebase Part 2 - Creating New Posts
date: 2021-01-11
description: Learn how to build a blog site with Next.js and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2021%2F01%2FNextFirebasePart2.png?alt=media&token=e8ddd3ae-2eb6-4ef1-bab2-5f082c61bed4
tags: [react, nextjs, firebase, web-development]
series_title: Build a Blog Site with Next.js and Firebase
series_slug: nextjs-firebase-blog
---

# TOC

1. Clone the starter code
2. Add a Page for Creating Posts
3. Make Inputs for Describing Posts
4. Write a Create Function

# Add a Page for Creating Posts

- add `create.module.scss` in `pages`:

```
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

- add `create.js` in `pages`:

```
import styles from './create.module.scss';

const CreatePage = () => (
  <div styles={className.CreatePage}>
    <h1>Hello, from CreatePage!</h1>
  </div>
);

export default CreatePage;
```

- show what it looks like

# Make inputs for describing posts

The post object (date will be auto-generated):

```
title
slug
dateCreated
coverImage
coverImageAlt
content
```

- add create.module.scss:

```
.CreatePage {
  padding: 24px;

  form {
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

- add some styles to the end of `global.scss`:

```
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

- scaffold the page

```
import { useState } from 'react';
import styles from './create.module.scss';

const CreatePage = () => {
  const [values, setValues] = useState({
    title: '',
    slug: '',
    coverImage: '',
    coverImageAlt: '',
    content: '',
  });

  const handleChange = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;

    setValues({ ...values, [id]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(values);
  }

  return (
    <div className={styles.CreatePage}>
      <form
        onSubmit={handleSubmit}
      >
        <h1>Create a new post</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            value={values.slug}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            id="coverImage"
            type="text"
            value={values.coverImage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="coverImageAlt">Cover Image Alt</label>
          <input
            id="coverImageAlt"
            type="text"
            value={values.coverImageAlt}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={values.content}
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

- show the page
- fill in some data
- show the console

# Write a Create Function

- add the `createPost` function to lib/firebase:

```
export const createPost = async (post) => {
  initFirebase();

  const dateCreated = new Date().getTime();
  post.dateCreated = dateCreated;

  return firebase.database().ref(`posts/${post.slug}`).set(post);
};
```

- import useRouter from next/router
- import the function in create.js
- add a loading state
- update handleSubmit to check for missing values, set the loading state, and call createPost

```
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createPost } from '@lib/firebase';
import styles from './create.module.scss';

const CreatePage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    title: '',
    slug: '',
    coverImage: '',
    coverImageAlt: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;

    setValues({ ...values, [id]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let missingValues = [];
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key);
      }
    });

    if (missingValues.length > 1) {
      alert(`You're missing these fields: ${missingValues.join(', ')}`);
      return;
    }

    setIsLoading(true);
    createPost(values)
      .then(() => {
        setIsLoading(false);
        router.push('/');
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.CreatePage}>
      <form
        onSubmit={handleSubmit}
      >
        <h1>Create a new post</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            value={values.slug}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            id="coverImage"
            type="text"
            value={values.coverImage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="coverImageAlt">Cover Image Alt</label>
          <input
            id="coverImageAlt"
            type="text"
            value={values.coverImageAlt}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={values.content}
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

- fill in some data again
- click create
- you should see the post at the top of the home page
- show screenshot
