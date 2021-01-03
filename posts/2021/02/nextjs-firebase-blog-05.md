---
title: Build a Blog Site with Next.js and Firebase Part 5 - Editing & Deleting Posts
date: 2021-01-04
description: Learn how to build a blog site with Next.js and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2021%2F02%2FNextFirebasePart5.png?alt=media&token=d0644d55-81ba-454b-adf1-81edfc912f66
tags: [react, nextjs, firebase, web-development]
series_title: Build a Blog Site with Next.js and Firebase
series_slug: nextjs-firebase-blog
---

# TOC

TODO

# Previously

TODO

# Edit page

- Add `updatePost` to `lib/firebase.js`:

```
export const updatePost = async (post) => {
  initFirebase();

  return firebase.database().ref(`/posts/${post.slug}`).set(post);
};
```

- Add `pages/edit/edit.module.scss`:

```
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

- Add `pages/edit/[slug].js`:

```
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getPostBySlug, updatePost } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import { Layout } from '@components';
import styles from './edit.module.scss';

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

# Add a link for editing

## Install FontAwesome

- the packages

```
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

- load in `pages/_app.js`:

```
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
```

## Add an Icon component:

- Install `classnames`:

```
npm install classnames
```

- Add `Icon` directory to `components`
- Add `components/Icon/Icon.module.scss`:

```
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

- Add `components/Icon/Icon.jsx`:

```
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

const Icon = ({ name, small, large, spin }) => {
  let cx = classNames.bind(styles);
  let className = cx('Icon', {
    'Icon--small': !!small,
    'Icon--large': !!large,
  });

  return (
    <FontAwesomeIcon className={className} icon={name || 'smile'} spin={spin} />
  );
};

export default Icon;
```

- export `Icon` from `components/index.js`:

```
export { default as Icon } from './Icon/Icon';
```

## Use Icon component in PostPage

- import `Icon`:

```
import { Icon, Layout } from '@components';
```

- import `useAuth` to check if there's a logged in user

```
import { useAuth } from '@contexts/auth';
```

- Put the `h1` in a `div` and show an edit link if a user is logged in:

```
<div>
  <h1>{post.title}</h1>
  {user && (
    <a href={`/edit/${post.slug}`}>
      <Icon name="pencil-alt" />
    </a>
  )}
</div>
```

- add styles for the div in `post.module.scss`:

```
& > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 8px;

  h1 {
    margin: 0;
  }

  a {
    padding: 8px;
    color: black;
  }
}
```

# Add a button for deleting

- add a `deletePost` function in `lib/firebase.js`:

```
export const deletePost = async (slug) => {
  initFirebase();

  return firebase.database().ref(`/posts/${slug}`).set(null);
};
```

- at the same level as the edit link we just added, add a `button` and wrap both in a `span`:

```
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
```

- add styles to `post.module.scss`:

```
span {
  display: flex;
  margin: 0;

  a {
    display: block;
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

- Create a new post for testing the delete functionality
- Go to the post's page and it should look like this:

![]()

- Click the trashcan icon and you should see this alert that says "Are you sure you want to delete this post?"
- Click OK and you should be taken back to the home page. That post will no longer be listed and it should also be gone from the database.
