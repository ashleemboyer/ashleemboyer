---
title: Build a Blog Site with Next.js and Firebase Part 4 - Adding Authentication
date: 2021-01-18
description: Learn how to build a blog site with Next.js and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2021%2F01%2FNextFirebasePart4.png?alt=media&token=af237a61-17a7-44f1-bd71-da0038767921
tags: [react, nextjs, firebase, web-development]
series_title: Build a Blog Site with Next.js and Firebase
series_slug: nextjs-firebase-blog
---

Welcome to the fourth post in my new "Build a Blog Site with Next.js and Firebase" series! This series is pretty similar to a series I wrote in 2019: ["Build a React & Firebase Blog Site"](/series/react-firebase-blog). Because it's been well over a year since I published that series, I decided to create a new series and use the Next.js React framework this time. It's a fun framework to use, and I know so many people that are curious about it. I hope you enjoy the series!

<a href="/nextjs-firebase-blog-03" style="width:fit-content;margin:40px auto;display:block;text-align:center;background-color:#c2185b;color:white;padding:8px 20px;border-radius:50vw;text-decoration:none;">Read Part 3 of the "Build a Blog Site with Next.js and Firebase" series</a>

Part 5 of this series will be published one week from today, Monday, February 1st, 2021. If you'd like to get an email notification when that happens, consider subscribing to my newsletter at [ashleemboyer.com/newsletter](/newsletter). As always, you can contact me through [Twitter](https://twitter.com/ashleemboyer) or [email](mailto:hello@ashleemboyer.com) if you run into any issues.

## TOC

- [Set up Authentication in the Firebase Console](#set-up-authentication-in-the-firebase-console)
- [Manage Authentication with React Context](#manage-authentication-with-react-context)
- [Check for an Authenticated User in CreatePage](#check-for-an-authenticated-user-in-createpage)
- [Add a Page for Signing In](#add-a-page-for-signing-in)
- [Add a Sign Out Button to Layout](#add-a-sign-out-button-to-layout)
- [Update the CreatePage Redirect](#update-the-create-page-redirect)

<hr />

The importance of authentication in this app is making it so only _you_ can create, edit, and delete posts. It is _your_ blog after all. We'll use Firebase Authentication to manage a user account and we'll track the authentication state using React Context. Then we can hide certain parts of the app from people who aren't logged in.

## Set up Authentication in the Firebase Console

Firebase makes it easy for us to set up email/password authentication in our app. It's also easy to add a user for ourselves right from the console. Make sure you use a real email address and a secure password for your user. This is how you're protecting your blog! _There's a video after these steps that visually walks though how to do this._

1. Go to [the Firebase console](console.firebase.google.com) for your project.
2. Go to the "Authentication" page under "Build".
3. Click "Get Started".
4. You should be on the "Sign-in method" tab.
5. Click "Email/Password".
6. Enable the first toggle.
7. Click "Save".
8. Switch to the "Users" tab.
9. Click "Add user".
10. Enter a secure email and password.
11. Click "Add user".

<iframe width="100%" height="350" src="https://www.youtube-nocookie.com/embed/WTnIU0ZtCoo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Manage Authentication State with React Context

1. Import `firebase/auth` into `lib/firebase.js` after the other Firebase imports:

```js
import 'firebase/auth';
```

2. Add an `onAuthStateChanged` function to `lib/firebase.js`:

```js
/*
Observes changes in authentication. Receives a callback function that is invoked
when auth state changes. See the Firebase Reference Docs for all of the details:
https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged
*/
export const onAuthStateChanged = async (callback) => {
  initFirebase();

  return firebase.auth().onAuthStateChanged((user) => callback(user));
};
```

3. Add a `contexts` directory at the root of the project.
4. Update `jsconfig.json` for the new `contexts` directory:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@components": ["components"],
      "@contexts/*": ["contexts/*"],
      "@lib/*": ["lib/*"],
      "@styles/*": ["styles/*"]
    }
  }
}
```

5. Add an `auth.js` file:

```js
import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from '@lib/firebase';

const AuthContext = createContext({ user: null, userLoading: true });

export const AuthProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthStateChanged((res) => {
      setUser(res);
      setUserLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={[user, userLoading]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

6. Update `pages/_app.js` to use `AuthProvider`:

```js
import { AuthProvider } from '@contexts/auth';
import '@styles/global.scss';

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default App;
```

7. Restart your development server if it's running.
8. Make sure your home page loads without error.
9. Commit and push your work to your repository:

```
git add .
git commit -m "Adding AuthContext"
git push
```

## Check for an Authenticated User in CreatePage

1. Import `useAuth`:

```jsx
import { useAuth } from '@contexts/auth';
```

2. Invoke it and log the results

```jsx
const [user, userLoading] = useAuth();
console.log(user, userLoading);
```

3. Visit `http://localhost:3000/create` in your browser.
4. You should see three logs in the console:

```
undefined true
null true
null false
```

The first shows the initial values of `user` and `userLoading` when we invoke `useAuth`. The second shows those values after the `callback` we pass into `onAuthStateChanged` has been invoked and `setUser` has been called. The third shows after `setUserLoading` has been called in the same `callback`. This is why we call `setUser` before `setUserLoading`, so we can ensure that everything is truly loaded before changing that state.

4. Redirect to 404 if no user and return null if user is loading, before the `handleChange` and `handleSubmit` functions are defined. Prevents us from unecessarily defining the functions if we're not going to use them.

```jsx
if (userLoading) {
  return null;
}

if (!user) {
  router.push('/404');
  return null;
}
```

5. Visit `http://localhost:3000/create` in your browser.
6. You should be redirected to the 404 page.
7. Commit and push your work to your repository:

```
git add .
git commit -m "Requiring Authentication in CreatePage"
git push
```

## Add a Page for Signing In

1. Add a new `signIn` function to `lib/firebase.js`:

```js
/*
Attempts to authenticate a user with a given email and password.
*/
export const signIn = async (email, password) => {
  initFirebase();

  return firebase.auth().signInWithEmailAndPassword(email, password);
};
```

2. Add `styles/signin.module.scss`:

```scss
.SignIn {
  max-width: 500px;
  margin: 32px auto;
  padding: 32px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(black, 0.3);

  form {
    h1 {
      margin: 0;
      margin-bottom: 24px;
      text-align: center;
    }

    input {
      margin-bottom: 16px;
    }

    button {
      min-width: 120px;
      display: block;
      margin-top: 32px;
      margin-right: auto;
      margin-left: auto;
    }
  }
}
```

3. Add `pages/signin.js`:

```jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import styles from '@styles/signin.module.scss';

const SignInPage = () => {
  const router = useRouter();
  const [user, userLoading] = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });

  if (userLoading) {
    return <h1>Loading...</h1>;
  }

  if (user && typeof window !== 'undefined') {
    router.push('/');
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

    signIn(values.email, values.password).catch((err) => {
      alert(err);
    });
  };

  return (
    <div className={styles.SignIn}>
      <form onSubmit={handleSubmit}>
        <h1>Please Sign In</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
```

4. Go to `http://localhost:3000/signin` in your browser.
5. Try logging in with the user credentials you created at the beginning of this post.
6. If successful, you should be sent to the home page.
7. Go to `http://localhost:3000/create` in your browser. You should not be redirected to the 404 page.
8. Commit and push your work to your repository:

```
git add .
git commit -m "Adding SignInPage"
git push
```

## Add a Sign Out Button to Layout

1. Add a new `signOut` function to `lib/firebase.js`:

```js
/*
Signs out the authenticated user.
*/
export const signOut = async () => {
  initFirebase();

  return firebase.auth().signOut();
};
```

2. Update the `Layout` component to check for a user and render a Sign Out button if there is one.

```jsx
import { signOut } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  const [user] = useAuth();

  return (
    <div className={styles.Layout}>
      <nav>
        <span>
          <a href="/">My Next.js Blog</a>
        </span>
        {user && (
          <span>
            <button onClick={() => signOut()}>Sign Out</button>
          </span>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
```

3. Update the `Layout` styles so the `<nav>` element uses Flexbox and the new button stands out from the blue bar.

```scss
.Layout {
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ...

    span {
      ...

      button {
        color: #1a73e8;
        background-color: white;
      }
    }
  }

  ...
}
```

4. Go to `http://localhost:3000/` in your browser.
5. In the blue bar at the top, you should see a white button with blue text that reads "Sign Out" like this:

[![](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-04%2FCleanShot%202021-01-17%20at%2018.36.51.png?alt=media&token=9d34e42d-945c-4ad2-bc3a-9161cc34bc9b)](https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2021%2F01%2Fnextjs-firebase-blog-04%2FCleanShot%202021-01-17%20at%2018.36.51.png?alt=media&token=9d34e42d-945c-4ad2-bc3a-9161cc34bc9b)

6. Click the Sign Out button and check that you can no longer access the create page at `http://localhost:3000/create`.
7. Commit and push your work to your repository:

```
git add .
git commit -m "Adding Sign Out button to Layout"
git push
```

## Update the CreatePage Redirect

1. In the `CreatePage` component, update `router.push('/404')` to `router.push('/signin')`.
2. Click the "Sign Out" button if you're signed in.
3. Try to access `http://localhost:3000/create` in your browser.
4. You should be sent to the sign in page.
5. Sign in with your credentials.
6. Try to access `http://localhost:3000/create` again.
7. You should be able to create posts.
8. Commit and push your work to your repository:

```
git add .
git commit -m "Redirecting to signin in CreatePage"
git push
```

9. Celebrate!!! You did it!!! <span role="img" aria-label="party popper emoji">🎉</span>
