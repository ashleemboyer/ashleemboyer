---
title: Build a Blog Site with Next.js and Firebase Part 3 - Reading Each Post
date: 2021-01-18
description: Learn how to build a blog site with Next.js and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2021%2F01%2FNextFirebasePart3.png?alt=media&token=6864eda2-2758-4496-a27f-4a7d9bda5262
tags: [react, nextjs, firebase, web-development]
series_title: Build a Blog Site with Next.js and Firebase
series_slug: nextjs-firebase-blog
---

Welcome to the third post in my new "Build a Blog Site with Next.js and Firebase" series! This series is pretty similar to a series I wrote in 2019: ["Build a React & Firebase Blog Site"](/series/react-firebase-blog). Because it's been well over a year since I published that series, I decided to create a new series and use the Next.js React framework this time. It's a fun framework to use, and I know so many people that are curious about it. I hope you enjoy the series!

<a href="/nextjs-firebase-blog-02" style="width:fit-content;margin:40px auto;display:block;text-align:center;background-color:#c2185b;color:white;padding:8px 20px;border-radius:50vw;text-decoration:none;">Read Part 2 of the "Build a Blog Site with Next.js and Firebase" series</a>

Part 4 of this series will be published almost one week from today, Monday, January 25th, 2021. If you'd like to get an email notification when that happens, consider subscribing to my newsletter at [ashleemboyer.com/newsletter](/newsletter). As always, you can contact me through [Twitter](https://twitter.com/ashleemboyer) or [email](mailto:hello@ashleemboyer.com) if you run into any issues.

## Table of Contents

- [Create a Page Component for Each Post](#create-a-page-component-for-each-post)
- [Link to Each Post on the Home Page](#link-to-each-post-on-the-home-page)
- [Load and Render Posts by Slug](#load-and-render-posts-by-slug)
- [Add Site Navigation and Semantic HTML](#add-site-navigation-and-semantic-html)
- [Consolidate Page Styles](#consolidate-page-styles)
- [One Last Thing](#one-last-thing)

<hr />

## Create a Page Component for Each Post

We don't currently have a way for people to read posts individually. We have the home page, which lists all blog posts, and we have a page for creating new posts. The good news is that we can handle rendering individual posts on their own pages pretty easily with [Next.js Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes). We just need to make sure we name the file correctly. Let's create a page component that renders the `slug` from the URL.

1. Add `post.module.scss` under the `styles` directory:

```scss
.PostPage {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;

  img {
    max-width: 100%;
    border-radius: 12px;
    border: 1px solid black;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 8px;

    h1 {
      margin: 0;
    }

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
  }

  span {
    margin-bottom: 16px;
  }
}
```

- Add a `post` directory to `pages`
- Add `[slug].js` under the `post` directory:

```jsx
import { useRouter } from 'next/router';
import styles from '@styles/post.module.scss';

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

2. Go to `https://localhost:3000/post/my-first-blog-post` in your browser
3. The page should look something like this:

[![White webpage with black text that reads "Hello, from post: my-first-blog-post!".](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-03%2FCleanShot%202021-01-17%20at%2013.46.33.png?alt=media&token=5fe24bde-e502-4fe8-af7c-8675261f2729)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-03%2FCleanShot%202021-01-17%20at%2013.46.33.png?alt=media&token=5fe24bde-e502-4fe8-af7c-8675261f2729)

4. Commit and push your work to your repository:

```
git add .
git commit -m "Adding basic PostPage component"
git push
```

## Link to Each Post on the Home Page

Now that we have a the pages dynamically generating, we can link to them on the home page.

1. In `pages/index.js`, add this `<a>` element below the `<p>` where you set `dangerouslySetHTML` with the post content:

```jsx
<a href={`/post/${post.slug}`}>Continue Reading</a>
```

2. In `styles/index.module.scss`, add `margin-bottom: 16px;` to the `p` element.
3. Below that style, add one for the `a` that sets the `color` to `#1a73e8`.
4. The home page should now look something like this:

[![Web page listing blog posts. Each has a black and white image of a random cat, a title in bold text, a date, excerpt, and blue link that reads "Continue Reading".](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-03%2FCleanShot%202021-01-17%20at%2014.01.54.png?alt=media&token=0acd5569-1da6-4e58-82da-48fb1f5ccb64)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-03%2FCleanShot%202021-01-17%20at%2014.01.54.png?alt=media&token=0acd5569-1da6-4e58-82da-48fb1f5ccb64)

5. Commit and push your work to your repository:

```
git add .
git commit -m "Adding links to each post"
git push
```

## Load and Render Posts by Slug

Our `PostPage` component doesn't do much yet, so let's take care of that now. We'll need to add a function for getting a post's details from Firebase and then update the `PostPage` component to render those details nicely.

1. A a `getPostBySlug` function to `lib/firebase.js` for getting the post from our Firebase Realtime Database:

```js
/*
Retrieves the data for a single post from a given slug.
*/
export const getPostBySlug = async (slug) => {
  initFirebase();

  return await firebase
    .database()
    .ref(`/posts/${slug}`)
    .once('value')
    .then((snapshot) => snapshot.val());
};
```

2. Import `getPostBySlug` at the top of `pages/post/[slug].js` (you can remove the `useRouter` import):

```jsx
import { getPostBySlug } from '@lib/firebase';
```

3. Right before `export default PostPage`, add `getServerSideProps` to `pages/post/[slug].js`.

```jsx
export async function getServerSideProps(context) {
  const post = await getPostBySlug(context.query.slug);

  return {
    props: {
      post,
    },
  };
}
```

4. Update the `PostPage` component to accept a `post` prop and render the post:

```jsx
const PostPage = ({ post }) => (
  <div className={styles.PostPage}>
    <img src={post.coverImage} alt={post.coverImageAlt} />
    <h1>{post.title}</h1>
    <span>Published {getFormattedDate(post.dateCreated)}</span>
    <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
  </div>
);
```

5. `PostPage` uses the same `getFormattedDate` function as the home page, so let's add a `utils.js` file under the `lib` directory and export the function from there. You will have to restart you development server after this step if it's running.

```js
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

6. Import `getFormattedDate` in both `pages/index.js` and `pages/post/[slug].js`:

```jsx
import { getFormattedDate } from '@lib/utils';
```

7. If you go to `http://localhost:3000/post/my-second-blog-post` in your browser, the page should look like this:

[![Webpage showing a black and white image of a random cat from PlaceKitten.com, the blog post title in bold font, the publish date, and the post content.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-03%2FCleanShot%202021-01-17%20at%2014.27.44.png?alt=media&token=dfd51d27-3a21-4ae5-a50d-e0cf4b136682)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-03%2FCleanShot%202021-01-17%20at%2014.27.44.png?alt=media&token=dfd51d27-3a21-4ae5-a50d-e0cf4b136682)

8. Commit and push your work to your repository:

```
git add .
git commit -m "Rendering posts in PostPage"
git push
```

## Add Site Navigation and Semantic HTML

### Add a Layout component

We've got our post pages, but now we need a way to navigate back to the home page! We also want the navigation to look the same on each page, so let's make a component for it that'll also help us consolidate some page styles.

1. Add a `components` directory at the root of your project.
2. Update `jsconfig.json` for the new `components` directory:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@components": ["components"],
      "@lib/*": ["lib/*"],
      "@styles/*": ["styles/*"]
    }
  }
}
```

3. Add an `index.js` file for exporting all components from the directory.
4. Add a `Layout` directory under the `components` directory.
5. Add `Layout.jsx` to `components/Layout`:

```jsx
const Layout = ({ children }) => <div>{children}</div>;

export default Layout;
```

6. Update `components/index.js` to export Layout:

```jsx
export { default as Layout } from './Layout/Layout';
```

7. Import `Layout` into `pages/post/[slug].js`:

```jsx
import { Layout } from '@components';
```

8. Update `PostPage` so that the rendered contents are wrapped by the new `Layout` component:

```jsx
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

9. Restart your development server if it's running.
10. If you go to `http://localhost:3000/post/my-second-blog-post` in your browser, the page should still look like this:

[![Webpage showing a black and white image of a random cat from PlaceKitten.com, the blog post title in bold font, the publish date, and the post content.](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-03%2FCleanShot%202021-01-17%20at%2014.27.44.png?alt=media&token=dfd51d27-3a21-4ae5-a50d-e0cf4b136682)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-03%2FCleanShot%202021-01-17%20at%2014.27.44.png?alt=media&token=dfd51d27-3a21-4ae5-a50d-e0cf4b136682)

11. Commit and push your work to your repository:

```
git add .
git commit -m "Adding new Layout component"
git push
```

### Add HTML landmarks to Layout

1. Add `Layout.module.scss` to `components/Layout`:

```SCSS
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

2. Import the styles in `components/Layout/Layout.jsx`:

```jsx
import styles from './Layout.module.scss';
```

3. Add a `className` to the `<div>` in `Layout` and add two elements: `<nav>` and `<main>`.

```jsx
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

4. Go to `https://localhost:3000/post/my-second-blog-post` in your browser.
5. It should look something like this and you should be able to go to the home page with the new link at the top:

[![The same webpage as before but with a blue bar at the top and a white link to the home page that reads "My Next.js Blog".](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-03%2FCleanShot%202021-01-17%20at%2015.06.06.png?alt=media&token=dd59ce2b-4a3e-4ef0-a7c5-50b150548953)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-03%2FCleanShot%202021-01-17%20at%2015.06.06.png?alt=media&token=dd59ce2b-4a3e-4ef0-a7c5-50b150548953)

6. Commit and push your work to your repository:

```
git add .
git commit -m "Adding nav and link to home page to Layout"
git push
```

## Consolidate Page Styles

Take a look styles in `index.module.scss`, `create.module.scss`, and `post.module.scss`. You should notice that all three of them have the same `max-width`, `margin`, and `padding` CSS properties and the same values for each. This is one benefit of having a `Layout` component. It helps you consolidate your styles and avoid repetition. It also allows you to make styling changes accross all of your pages at once. For example, if you wanted to make the main content of your site narrower, you could update `max-width` in this one place to do so.

Let's remove these three properties from `index.module.scss`, `create.module.scss`, and `post.module.scss` and use the new `Layout` component on these pages.

1. Import `Layout` in `pages/index.js` and `pages/create.js`:

```jsx
import { Layout } from '@components';
```

2. Wrap the rendered content in `pages/index.js` and `pages/create.js` with the opening and closing `Layout` tags.
3. Delete the `max-width`, `margin`, and `padding` from `index.module.scss`, `create.module.scss`, and `post.module.scss`.
4. Update the `main` styles in `components/Layout/Layout.module.scss` to handle `max-width`, `margin`, and `padding` for page content:

```scss
main {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
}
```

5. All of your pages should have the same blue naviation bar at the top now.
6. Commit and push your work to your repository:

```
git add .
git commit -m "Using Layout in all pages and consolidating styles"
git push
```

## One last thing

What if someone tries to go to a post that doesn't exist? Let's try it. Go to `https://localhost:3000/post/abcdefg` in your browser. You should see a Server Error error that says `"Cannot read property 'coverImage' of null"`. This is because the `PostPage` component is expecting its `post` prop to be defined. Since the post isn't found in the database, our `getPostBySlug` is returning `null`. So, the `post` object passed to `PostPage` is null and doesn't have any attributes we can access off of it.

1. Import `useRouter` again in the `PostPage` component and check to see if `post` is defined. Redirect to `/404` if the post doesn't exist.

```jsx
const PostPage = ({ post }) => {
  const router = useRouter();

  if (!post) {
    router.push('/404');
    return;
  }

  return (
    <Layout>
      <div className={styles.PostPage}>
        <img src={post.coverImage} alt={post.coverImageAlt} />
        <h1>{post.title}</h1>
        <span>Published {getFormattedDate(post.dateCreated)}</span>
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
      </div>
    </Layout>
  );
};
```

Uh oh! There's another Server Error: "No router instance found. you should only use "next/router" inside the client side of your app." This is happening because this code is running on the server side of our app and the `router.push` method is not supported there. You can read more about it at the link mentioned in the error.

2. To fix it, let's add an additional check to our `if` statement:

```jsx
if (!post && typeof window !== 'undefined') {
  router.push('/404');
  return;
}
```

If we run this, we still get a Server Error: "Cannot read property 'coverImage' of null". The `if` statement we just added is mainly for the client-side and doesn't tell the server-side what to do if the `post` object is undefined.

3. Add one more `if` statement below the first one that just returns `null` if `post` isn't defined.

```jsx
const PostPage = ({ post }) => {
  const router = useRouter();

  if (!post) {
    router.push('/404');
    return;
  }

  if (!post) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.PostPage}>
        <img src={post.coverImage} alt={post.coverImageAlt} />
        <h1>{post.title}</h1>
        <span>Published {getFormattedDate(post.dateCreated)}</span>
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
      </div>
    </Layout>
  );
};
```

4. Check that you're redirected to a 404 page.
5. Commit and push your work to your repository:

```
git add .
git commit -m "Redirecting to 404 if post doesn't exist"
git push
```

6. Celebrate!!! You did it!!! <span role="img" aria-label="party popper emoji">🎉</span>
