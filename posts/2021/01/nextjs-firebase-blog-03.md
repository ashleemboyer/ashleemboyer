---
title: Build a Blog Site with Next.js and Firebase Part 3 - Reading Each Post
date: 2021-01-18
description: Learn how to build a blog site with Next.js and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2021%2F01%2FNextFirebasePart3.png?alt=media&token=6864eda2-2758-4496-a27f-4a7d9bda5262
tags: [react, nextjs, firebase, web-development]
series_title: Build a Blog Site with Next.js and Firebase
series_slug: nextjs-firebase-blog
---

# TOC

- create post page

# Create the page

- Add `post` directory to `pages`
- Add `post.module.scss` under the `post` directory:

```
TODO
```

- Add `[slug].js` under the `post` directory:

```
import { useRouter } from 'next/router';
import styles from './post.module.scss';

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className={styles.PostPage}>
      <h1>Hello, from post: {slug}!</h1>
    </div>
  );
};

export default PostPage;
```

- navigate to `https://localhost:3000/post/my-first-blog-post`
- you should see this (show screenshot)

# Add links to home page

- Add this `a` element below the `p` where you set `dangerouslySetHTML`:

```
<a href={`/post/${post.slug}`}>Continue Reading</a>
```

- Update the `p` styles `index.module.scss` so it has a `margin-bottom` of `16px`
- Below that style, add one for the `a` that sets the `color` to `#1a73e8`

# Load the blog post by slug

- add a firebase function for it (`getPostBySlug`):

```
export const getPostBySlug = async (slug) => {
  initFirebase();

  return await firebase
    .database()
    .ref(`/posts/${slug}`)
    .once('value')
    .then((snapshot) => snapshot.val());
};
```

- import it at the top of `[slug].js`:

```
import { getPostBySlug } from '@lib/firebase';
```

- add `getServerSideProps` to `[slug].js`:

```
export async function getServerSideProps(context) {
  const post = await getPostBySlug(context.query.slug);

  return {
    props: {
      post,
    },
  };
}
```

- Make `PostPage` accept a `post` prop and render the post:

```
const PostPage = ({ post }) => (
  <div className={styles.PostPage}>
    <img src={post.coverImage} alt={post.coverImageAlt} />
    <h1>{post.title}</h1>
    <span>Published {getFormattedDate(post.dateCreated)}</span>
    <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
  </div>
);
```

- We need to use teh same `getFormattedDate` function, so let's add a `utils.js` file to `lib` and export the function from there:

```
export const getFormattedDate = (milliseconds) => {
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

- Import it in both `index.js` and `[slug].js`:

```
import { getFormattedDate } from '@lib/utils';
```

- show what the page looks like

# Site nav

## Add a Layout component

We need a way to navigate back to the home page! We also want the nav to look the same on each page, so let's make a component for it that'll also help us consolidate some page styles.

- Add a `components` directory at the root
- Add an `index.js` file for exporting all components
- Add a `Layout` directory under `components`
- Add `Layout.jsx` to `components/Layout`:

```
const Layout = () => (
  <div>
    <h1>Hello, from Layout!</h1>
  </div>
);

export default Layout;
```

- Add `@components` to `jsconfig.json` paths:

```
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@components": ["components"],
      "@lib/*": ["lib/*"]
    }
  }
}
```

- Update `components/index.js` to export Layout:

```
export { default as Layout } from './Layout/Layout';
```

- Import `Layout` into `pages/post/[slug].js`:

```
import { Layout } from '@components';
```

- Temporarily only render the `Layout` component to test that it works:

```
const PostPage = ({ post }) => (
  <Layout></Layout>
  // <div className={styles.PostPage}>
  //   <img src={post.coverImage} alt={post.coverImageAlt} />
  //   <h1>{post.title}</h1>
  //   <span>Published {getFormattedDate(post.dateCreated)}</span>
  //   <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
  // </div>
);
```

- Page should look like this: (show image)

- Update `Layout` to accept `children` as a prop and render them:

```
const Layout = ({ children }) => (
  <div className={styles.Layout}>{children}</div>
);
```

- Pass the original `PostPage` content to the `Layout` component (AKA wrap the content with the `Layout` tags):

```
const PostPage = ({ post }) => (
  <Layout>
    <div className={styles.PostPage}>
      <img src={post.coverImage} alt={post.coverImageAlt} />
      <h1>{post.title}</h1>
      <span>Published {getFormattedDate(post.dateCreated)}</span>
      <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
    </div>
  </Layout>
);
```

- Should look the same as before!

## Add HTML landmarks to Layout

- Add `Layout.module.scss`:

```
.Layout {
  nav {
    padding: 24px;
    background-color: #1a73e8;

    span {
      a {
        font-size: 1.6rem;
        font-weight: bold;
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  main {
    padding: 24px;
  }
}
```

- Import the styles:

```
import styles from './Layout.module.scss';
```

- We'll have two elements to add: `nav` and `main`. Let's add those and a link to the home page:

```
const Layout = ({ children }) => (
  <div className={styles.Layout}>
    <nav>
      <span>
        <a href="/">My Next.js Blog</a>
      </span>
    </nav>
    <main>{children}</main>
  </div>
);
```

# Consolidate styles

Look at the `main` styles in `Layout.module.scss`. Do they look familiar? If they do, it's because we use those same styles for `max-width`, `margin`, and `padding` in `index.module.scss`, `create.module.scss`, and `post.module.scss`. This is one benefit of having a `Layout` component. It helps you consolidate your styles and avoid repetition. It also allows you to make styling changes accross all of your pages at once. For example, if you wanted to make the main content of your site narrower, you could update `max-width` in this one place to do so.

Let's remove these three styles from the other SCSS files and also use our Layout component in the `HomePage` and `CreatePage` components. You'll need to:

- import the `Layout` component in each page
- wrap the rendered content with the opening and closing `Layout` tags
- and delete the `max-width`, `margin`, and `padding` from the `.HomePage`, `.CreatePage`, and `.PostPage` classes
