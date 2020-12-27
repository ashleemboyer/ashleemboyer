---
title: Build a Blog Site with Next.js and Firebase Part 4 - Adding Authentication
date: 2021-01-18
description: Learn how to build a blog site with Next.js and Firebase.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2021%2F01%2FNextFirebasePart4.png?alt=media&token=af237a61-17a7-44f1-bd71-da0038767921
tags: [react, nextjs, firebase, web-development]
series_title: Build a Blog Site with Next.js and Firebase
series_slug: nextjs-firebase-blog
---

# TOC

TODO

# Previously

TODO

# Add a Context for managing current user

- Import `firebase/auth` into `lib/firebase.js`:

```
import 'firebase/auth';
```

- Add an `onAuthStateChanged` function to `lib/firebase.js`:

```
export const onAuthStateChanged = async (callback) => {
  initFirebase();

  return firebase.auth().onAuthStateChanged((user) => callback(user));
};
```

- Add a `contexts` directory
- Add a `auth.js` file:

```
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

- Add `@contexts` to `jsconfig.json` paths:

```
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@components": ["components"],
      "@contexts/*": ["contexts/*"],
      "@lib/*": ["lib/*"]
    }
  }
}
```

- Update `pages/_app.js` to use `AuthProvider`:

```
import { AuthProvider } from '@contexts/auth';
import '../styles/global.scss';

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default App;
```

# Check for a user in CreatePage

- Import `useAuth`:

```
import { useAuth } from '@contexts/auth';
```

- Invoke it and log the results

```
const [user, userLoading] = useAuth();
console.log(user, userLoading);
```

You should see three logs in the console:

1. undefined true
2. null true
3. null false

The first shows the initial values of `user` and `userLoading` when we invoke `useAuth`. The second shows those values after the `callback` we pass into `onAuthStateChanged` has been invoked and `setUser` has been called. The third shows after `setUserLoading` has been called in the same `callback`. This is why we call `setUser` before `setUserLoading`, so we can ensure that everything is truly loaded before changing that state.

- Redirect to 404 if no user and return null if user is loading, before the `handleChange` and `handleSubmit` functions are defined. Prevents us from unecessarily defining the functions if we're not going to use them.

```
if (!user && !userLoading) {
  router.push('/404');
  return;
}

if (userLoading) {
  return null;
}
```

# Set up Auth in the Firebase Console

- Go to [the console](console.firebase.google.com)
- Go to the "Authentication" page under "Build"
- Click "Get Started"
- You should be on the "Sign-in method" tab
- Click "Email/Password"
- Enable the first toggle
- Click "Save"
- Switch to the "Users" tab
- Click "Add user"
- Enter a secure email and password (this is how you're protecting your blog!)
- Click "Add user"

# Add Firebase function for signing in

- Add `signIn` to `lib/firebase.js`:

```
export const signIn = async (email, password) => {
  initFirebase();

  return firebase.auth().signInWithEmailAndPassword(email, password);
};
```

# Add a login page

- Add `pages/signin.module.scss`:

```
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

- Add `pages/signin.js`:

```
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import styles from './signin.module.scss';

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

- try logging in
- you should be sent to the home page

## Add sign out button to Layout

- write a `signOut` function:

```
export const signOut = async () => {
  initFirebase();

  return firebase.auth().signOut();
};
```

- import `signOut` in `Layout`:

```
import { signOut } from '@lib/firebase';
```

- import `useAuth`

```
import { useAuth } from '@contexts/auth';
```

- invoke `useAuth` to check for a `user`:

```
const [user] = useAuth();
```

- render a second `<span>` in `<nav>` with the sign out button if there's a `user`:

```
{user && (
  <span>
    <button onClick={() => signOut()}>Sign Out</button>
  </span>
)}
```

# Require sign in for the CreatePage component

- update `router.push('/404')` to `router.push('/signin')`
- click "sign out" if you're signed in
- try to go to /create
- you should be sent to the login page
- sign in
- try to go to /create
- you should be able to create posts

# Next Time

edit and delete posts
