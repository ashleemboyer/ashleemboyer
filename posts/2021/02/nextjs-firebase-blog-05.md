---
title: Build a Blog Site with Next.js and Firebase Part 5 - Editing & Deleting Posts
date: 2021-02-02
description: Learn how to build a blog site with Next.js and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F02%2Fnextjs-firebase-blog-05%2FNextFirebasePart5.png?alt=media&token=467729de-9aa6-4e27-8641-f8e172dbfb4c
tags: [react, nextjs, firebase, web-development]
series_title: Build a Blog Site with Next.js and Firebase
series_slug: nextjs-firebase-blog
---

Welcome to the fifth and final post in my new "Build a Blog Site with Next.js and Firebase" series! This series is pretty similar to a series I wrote in 2019: ["Build a React & Firebase Blog Site"](https://ashleemboyer.com/series/react-firebase-blog). Because it's been well over a year since I published that series, I decided to create a new series and use the Next.js React framework this time. It's a fun framework to use, and I know so many people that are curious about it. I hope you have enjoyed the series! As always, you can contact me through [Twitter](https://twitter.com/ashleemboyer) or [email](mailto:hello@ashleemboyer.com) if you run into any issues.

## Table of Contents

- [Add a page for Editing Posts](#add-a-page-for-editing-posts)
- [Install FontAwesome](#install-fontawesome)
- [Add an Icon component](#add-an-icon-component)
- [Add a Link for EditPage](#add-a-link-for-editpage)
- [Add a Delete Button](#add-a-delete-button)

<hr />

## Add a Page for Editing Posts

1. Add a new `updatePost` function to `lib/firebase.js`:

```js
/*
Updates the data for the given post in the database.
*/
export const updatePost = async (post) => {
  initFirebase();

  return firebase.database().ref(`/posts/${post.slug}`).set(post);
};
```

2. Add `edit.module.scss` to the `styles` directory:

```scss
.EditPage {
  form {
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

3. Add an `edit` directory to `pages`.
4. Add `[slug].js` to `pages/edit` directory:

```jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getPostBySlug, updatePost } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import { Layout } from '@components';
import styles from '@styles/edit.module.scss';

const EditPage = ({ post }) => {
  const router = useRouter();
  const [user, userLoading] = useAuth();
  const [values, setValues] = useState(post);
  const [isLoading, setIsLoading] = useState(false);

  if (userLoading) {
    return null;
  }

  if (!user && typeof window !== 'undefined') {
    router.push('/signin');
    return null;
  }

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
    updatePost(values)
      .then(() => {
        setIsLoading(false);
        router.push(`/post/${post.slug}`);
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <div className={styles.EditPage}>
        <form onSubmit={handleSubmit}>
          <h1>Edit Post: {post.slug}</h1>
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
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const post = await getPostBySlug(context.query.slug);

  return {
    props: {
      post,
    },
  };
}

export default EditPage;
```

5. Go to `http://localhost:3000/edit/my-first-blog-post` in your browser. It should look a lot like the create page.
6. Change something about the post and click "Update".
7. You should be taken to the page for the post and should see your changes.
8. Commit and push your work to your repository:

```
git add .
git commit -m "Adding EditPage component"
git push
```

## Install FontAwesome

1. Install the `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`, and `@fortawesome/react-fontawesome` packages:

```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

2. Load the icons in `pages/_app.js`:

```jsx
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
```

3. Commit and push your work to your repository:

```
git add .
git commit -m "Installing FontAwesome"
git push
```

## Add an Icon component

We're going to make a wrapper component for the `FontAwesomeIcon` to make it easy to render an icon at different sizes and so we don't have to remember the import path for the `FontAwesomeIcon` component. The `classnames` package is great conditionally applying classes based on boolean props passed to a component. You can read more about the package [here](https://github.com/JedWatson/classnames#readme).

1. Install the `classnames` package:

```
npm install classnames
```

2. Add `Icon` directory to the `components` directory.
3. Add `Icon.module.scss` to the `components/Icon` directory:

```scss
$icon-small: 1rem;
$icon-medium: 1.5rem;
$icon-large: 2rem;

.Icon {
  width: $icon-medium;
  height: $icon-medium;
  font-size: $icon-medium;

  &--small {
    width: $icon-small;
    height: $icon-small;
    font-size: $icon-small;
  }

  &--large {
    width: $icon-large;
    height: $icon-large;
    font-size: $icon-large;
  }
}
```

4. Add `Icon.jsx` to the `components/Icon` directory:

```jsx
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

const Icon = ({ name, small, large }) => {
  let cx = classNames.bind(styles);
  let className = cx('Icon', {
    'Icon--small': small,
    'Icon--large': large,
  });

  return <FontAwesomeIcon className={className} icon={name} />;
};

export default Icon;
```

5. Update `components/index.js` to export `Icon`:

```js
export { default as Icon } from './Icon/Icon';
```

6. Commit and push your work to your repository:

```
git add .
git commit -m "Adding Icon component"
git push
```

## Add a Link for EditPage

1. Import the new `Icon` component in `PostPage` (that's `pages/post/[slug.js]`):

```jsx
import { Icon, Layout } from '@components';
```

2. Also import `useAuth` in `PostPage`:

```jsx
import { useAuth } from '@contexts/auth';
```

3. Invoke `useAuth` after `useRouter` in `PostPage`:

```jsx
const [user] = useAuth();
```

4. Wrap the `<h1>` with the post's title in a `<div>` and also render an edit link in the `<div>` if there's an authenticated user:

```jsx
<div>
  <h1>{post.title}</h1>
  {user && (
    <a href={`/edit/${post.slug}`}>
      <Icon name="pencil-alt" />
    </a>
  )}
</div>
```

5. After the `<h1>` styles in `styles/post.module.scss`, add styles for the `<a>` element:

```scss
a {
  padding: 8px;
  color: black;
}
```

6. Go to `http://localhost:3000/post/my-first-blog-post` in your browser.
7. Click the new pencil icon.
8. You should be taken to the edit page for `my-first-blog-post`.
9. Commit and push your work to your repository:

```
git add .
git commit -m "Adding edit link"
git push
```

## Add a Delete Button

1. Add a new `deletePost` function in `lib/firebase.js`:

```js
/*
Deletes a post from the database.
*/
export const deletePost = async (slug) => {
  initFirebase();

  return firebase.database().ref(`/posts/${slug}`).set(null);
};
```

2. Import the `deletePost` function in `PostPage`:

```jsx
import { deletePost, getPostBySlug } from '@lib/firebase';
```

3. At the same level as the edit link we just added in the previous section, add a `<button>` and wrap both elements in a `div`:

```jsx
<span>
  <a href={`/edit/${post.slug}`}>
    <Icon name="pencil-alt" />
  </a>
  <button
    onClick={() => {
      const shouldDeletePost = confirm(
        'Are you sure you want to delete this post?',
      );
      if (shouldDeletePost) {
        deletePost(post.slug).then(() => {
          router.push('/');
        });
      }
    }}
  >
    <Icon name="trash-alt" />
  </button>
</span>
```

4. Replace the `a` styles you added to `styles/post.module.scss` with these:

```scss
& > div {
  display: flex;
  margin: 0;

  a {
    padding: 8px;
    color: black;
  }

  button {
    background: transparent;
    box-shadow: none;
    border: none;
    color: black;
  }
}
```

5. Create a new post for testing the delete functionality.
6. Go to the post's page and you should see a trashcan icon to the right of the pencil icon like this:

[![](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F02%2Fnextjs-firebase-blog-05%2FCleanShot%202021-01-17%20at%2019.54.16.png?alt=media&token=5371736e-21fe-41b4-b3a0-ed9b5ad6cde0)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F02%2Fnextjs-firebase-blog-05%2FCleanShot%202021-01-17%20at%2019.54.16.png?alt=media&token=5371736e-21fe-41b4-b3a0-ed9b5ad6cde0)

7. Click the trashcan icon and you should see an alert that says "Are you sure you want to delete this post?"
8. Click OK and you should be taken back to the home page. That post will no longer be listed and it should also be gone from the database.
9. Commit and push your work to your repository:

```
git add .
git commit -m "Adding delete button"
git push
```

0. Celebrate!!! You did it!!! <span role="img" aria-label="party popper emoji">🎉</span>
