---
title: Set up a React App for Testing with Jest and Enzyme
date: 2020-12-01
description: Learn how to set up and configure a React app for Jest and Enzyme testing in just a few steps.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2020%2F12%2F01%2FSet%20up%20a%20React%20App%20for%20Testing%20with%20Jest%20and%20Enzyme.png?alt=media&token=9aa23166-6d02-40f7-8faa-36287f9f3b16
tags: [javascript, testing, web-development]
---

It's been awhile since I've set up a React app for testing with Jest and Enzyme. Since I had to look up more than one of these steps to remind myself how to accomplish this, I decided to write a super quick guide in case it helps anyone else.

## Dec. 8th Correction

Enzyme is not yet compatible with React 17. You should make sure the highest version of React you are using is `16.14.0` if you want to use Enzyme with your tests. [This PR](https://github.com/enzymejs/enzyme/pull/2430) will add an adapter for React 17. *Please do not ask them when it will be done, it will be done when they get it done!*

## Step 1: Create the app with `create-react-app`

This requires having `npx` installed. You can read about it [here](https://www.npmjs.com/package/npx).

```bash
npx create-react-app <app-name>
```

## Step 2: If you use Sass modules, like me, install `node-sass`

At the time of this writing, `node-sass@5.0.0` in incompatible and `node-sass@4.14.1` must be installed instead. There's a Stack Overflow answer about it [here](https://stackoverflow.com/questions/64625050/error-node-sass-version-5-0-0-is-incompatible-with-4-0-0/64626556#64626556).

```bash
yarn add node-sass@4.14.1
```

## Step 3. Install the dev dependencies for Enzyme

The `--dev` option is what saves these under `devDependencies` in your `package.json` file. Why do they need to be under `devDependencies`? Because these kinds of dependences are "Packages that are only needed for local development and testing." You can read a little more on that [here](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file).

```bash
yarn add --dev enzyme enzyme-adapter-react-16
```

## Step 4. Configure Enzyme with an adapter in `setupTests.js`

Enzyme needs to know what adapter you want to use. We tell it in the `setupTests.js` file in the `src` directory of your project. You can get more details about setting up Enzyme [here](https://enzymejs.github.io/enzyme/).

Your `setupTests.js` should only have some comments and one `import` statement right now. Just add these lines right after that `import`:

```jsx
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

## Step 5. Get to testing! 💪

Everything you need is installed and now you just need to write up some tests. Here are some Jest and Enzyme docs to help you get started:

- [Jest "Getting Started" Guide](https://jestjs.io/docs/en/getting-started)
- [Jest "Testing React Apps" Guide](https://jestjs.io/docs/en/tutorial-react)
- [Enzyme's "Using enzyme with Jest" Guide](https://enzymejs.github.io/enzyme/docs/guides/jest.html)
- [Enzyme API Reference](https://enzymejs.github.io/enzyme/docs/api/)
