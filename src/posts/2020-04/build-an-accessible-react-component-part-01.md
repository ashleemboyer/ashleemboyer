---
title: 'Build an Accessible Breadcrumb Component: Part 1 in the Accessible React Component Series'
date: '2020-04-25'
description: 'The first accessible React component in the live series is a breadcrumb.'
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/headers%2F2020%2F02%2FBuild%20an%20Accessible%20Breadcrumb%20Component.png?alt=media&token=fa786a6e-c227-4458-92df-13129ce4ce86
tags: [a11y, react, barc]
---

During the first stream in the accessible React component live coding series, we spun the wheel and it chose the breadcrumb component for us! While the component was extremely straightforward, I think it was a great one to kick off the series. Let's dive right in, shall we?

## Setup

You can skip this part if you already have your own React project set up. This section is for anyone who wants to follow the series with a fresh project.

1. Run `npx create-react-app <project-name>` in your terminal
2. Remove the `src/App.css` file
3. Replace your `src/App.js` file with this code:

```jsx
import React from 'react';

const App = () => <div>Hello, world!</div>;

export default App;
```

4. Rename `src/index.css` to `index.scss`
5. Update the reference to the file from 4 in `src/index.js`
6. Remove `src/logo.svg`
7. Run the app (`yarn start` or `npm start`)

Now, you should see a "Failed to compile" error in your browser and it should be because we haven't added the `node-sass` package to or project yet.

8. Run `yarn add node-sass` or `npm install node-sass` in the terminal you've been working in so far
9. Re-run your app (`yarn start` or `npm start`)

Your browser should say "Hello, world!" now. We're all set up!

## My process (ToC)

1. [Read through the WAI-ARIA Authoring Practices documentation](#1-the-wai-aria-authoring-practices-documentation)
2. [Create a minimal React component that says "Hello"](#2-a-minimal-react-component)
3. [Flesh out the React component with the necessary HTML elements](#3-add-html-elements-to-the-react-component)
4. [Figure out what inputs (props) the React component needs](#4-add-props-to-the-react-component)
5. [Add the necessary WAI-ARIA Roles, States, and Properties](#5-wai-aria-roles-states-and-properties)
6. [Add keyboard interaction](#6-add-keyboard-interaction)
7. [Perform manual tests (listen with a screen reader, navigate with a keyboard, etc.)](#7-perform-manual-tests)
8. [Add automated tests](#8-add-automated-tests)
9. [Write the documentation](#9-write-the-documentation)

## 1. The WAI-ARIA Authoring Practices Documentation

The first thing we have to do is read [the available documentation for this component](https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb) on the WAI-ARIA Authoring Practices web page. There's not too much to this component.

> A breadcrumb trail consists of a list of links to the parent pages of the current page in hierarchical order. It helps users find their place within a website or web application. Breadcrumbs are often placed horizontally before a page's main content.

There's no keyboard interaction to add here since you can use the Tab and Shift+Tab keys by default to navigation through links. We just have to make sure we're using the correct HTML elements in our component and we have one ARIA state ([`aria-current`](https://www.w3.org/TR/wai-aria-1.1/#aria-current)) and one ARIA property ([`aria-label`](https://www.w3.org/TR/wai-aria-1.1/#aria-label)) to include as well.

## 2. A Minimal React Component

This series of blog posts will use the file structure I have laid out in my [`a11y-components`](https://www.w3.org/TR/wai-aria-1.1/#aria-current) GitLab repository. It looks a bit like this:

```
src/
  components/
    Button/
    Dialog/
    Listbox/
    ...
  App.js
```

Let's add a `Breadcrumb` folder under `components`. You need to create the `components` folder and add an `index.js` file to it if you followed the Setup section above. Then we need to add 5 files to the Breadcrumb folder:

- Breadcrumb.jsx
- Breadcrumb.module.scss
- Breadcrumb.test.js
- index.js
- README.md

### Breadcrumb.jsx

This file will have all of our React code. Let's start with something minimal to check if our setup is correct:

```jsx
import React from 'react';

const Breadcrumb = () => <h1>Breadcrumb works!</h1>;

export default Breadcrumb;
```

### Breadcrumb.module.scss

This file will hold all of our CSS. We'll wait to add anything here until we start building up the component.

### Breadcrumb.test.js

Don't forget to write tests! They're not only important for making sure your component works as expected, but also for making sure that future changes you make don't break existing behavior. We'll write these after we've finished the component.

### index.js

This file is for exporting everything we need from the Breadcrumb component so it can be used elsewhere in the application. More complex components might have multiple exports in this file but ours will stay simple for this component:

```jsx
export { default as Breadcrumb } from './Breadcrumb';
```

### README.md

This is where we'll document our component. It's important to detail a component's purpose and how to use it. We'll have 3 main sections: Properties, Accessibility, and Usage (examples). Let's also save this file for when the component is done.

### Test it out

First add the following to the `src/components/index.js` file:

```jsx
export { Breadcrumb } from './Breadcrumb';
```

Then update `src/App.js` to use the component:

```jsx
import React from 'react';

import { Breadcrumb } from './components';

const App = () => <Breadcrumb />;

export default App;
```

Check your browser. It should say "Breadcrumb works!" with an `<h1>` element.

## 3. Add HTML elements to the React Component

Now that our component has all its files created and we've got a minimal version of it working and showing in our browser, we can start building it out to specification. Let's head back over to [the documentation](https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb) and see what elements we need to use. You should see an "Example" section for the widget and a single link to the example. Let's [go there](https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html).

Under "Accessibility Features" we can see that we need a `<nav>` element to contain all of the links and that the links need to be structured in an ordered list (`<ol>`) component. Don't worry about how the elements need to be labeled just yet. We'll get to that in a few minutes.

Let's change what our Breadcrumb component renders first. We can hardcode the elements for now and then make the component more dynamic in the next step.

```jsx
<nav>
  <ol>
    <li>
      <a href="">Link 1</a>
    </li>
    <li>
      <a href="">Link 2</a>
    </li>
    <li>
      <a href="">Link 3</a>
    </li>
  </ol>
</nav>
```

Save your component and you should see something like the following in your browser:

```
1. Link 1
2. Link 2
3. Link 3
```

Yay! Now we need to style the list horizontally and add a separator between each link. We're going to do this in CSS so that screen readers don't pick them up and present them to users.

1. Import the SCSS file in `Breadcrumb.jsx`:

```jsx
import styles from './Breadcrumb.module.scss';
```

2. Give the `nav` element in the component a `className`:

```jsx
<nav className={styles.BreadcrumbContainer}>...</nav>
```

3. Add the code to `Breadcrumb.module.scss`:

```scss
.BreadcrumbContainer {
  padding: 12px;
  background-color: lightgray;
  text-align: left;

  ol {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline;
      margin: 0;
      padding: 0;

      a {
        color: black;
      }
    }
  }

  // The visual separators
  li + li::before {
    display: inline-block;
    margin: 0 12px;
    transform: rotate(15deg);
    border-right: 2px solid black;
    height: 0.8em;
    content: '';
  }
}
```

The links should be listed horizontally on a gray background have separators between each.

## 4. Add Props to the React Component

Let's make our component accept a list of links so it's dynamic and can be reused. It looks like each link has two pieces: a readable label and an `href`. We first need to update `src/App.js` and pass an array of links to the component like this:

```jsx
<Breadcrumb
  links={[
    {
      label: 'Link 1',
      href: '',
    },
    {
      label: 'Link 2',
      href: '',
    },
    {
      label: 'Link 3',
      href: '',
    },
  ]}
/>
```

Now we need to update the component to accept and use a prop called `links`.

```jsx
const Breadcrumb = ({ links }) => (
  <nav className={styles.BreadcrumbContainer}>
    <ol>
      {links.map(link => (
        <li>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ol>
  </nav>
);
```

When you look at the browser, it should look exactly as it did before this step if you're using the same links as you previously hardcoded.

## 5. WAI-ARIA Roles, States, and Properties

We have two ARIA attributes to discuss for this component: `aria-label` and `aria-current`.

### `aria-label`

This attribute describes the kind of navigation the component is providing. It must be set to "Breadcrumb" like this:

```jsx
<nav aria-label="Breadcrumb">...</nav>
```

You can read more about the `aria-label` property [here](https://www.w3.org/TR/wai-aria-1.1/#aria-label).

### `aria-current`

This attribute is applied to the last link in the list so it will be presented as the current page's link. We can accompomplish this by using the second parameter passed to our callback to [the `map` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), which is the index of the current element in the array. If the index we're looking at is one less than the length of the index, then we're looking at the last element in the array and need to apply the `aria-current="page"` attribute to the `<a>` element we're rendering. Otherwise, the attribute should be `undefined`. Let's also add a unique `key` to each `<li>` while we're at it.

Here's what the `<ol>` element should look like now:

```jsx
<ol>
  {links.map((link, index) => {
    const isLastLink = index === links.length - 1;
    return (
      <li key={`breadcrumb-link-${index}`}>
        <a href={link.href} aria-current={isLastLink ? 'page' : undefined}>
          {link.label}
        </a>
      </li>
    );
  })}
</ol>
```

We also probably want to style the current page's link differently to indicate that it's the page we're on. We can do this in our SCSS file by selecting on the `aria-current` attribute. You'll want to add this to the `ol` section of the file:

```scss
[aria-current='page'] {
  font-weight: bold;
  text-decoration: none;
}
```

You can read more about the `aria-current` state [here](https://www.w3.org/TR/wai-aria-1.1/#aria-current).

## 6. Add Keyboard Interaction

We don't have any keyboard interaction to add to this component! We just need to make sure that Tab and Tab+Shift work as expected with `<a>` elements.

## 7. Perform Manual Tests

I use the [ChromeVox Classic Extension](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) to to do screen reader testing. It's easy to turn on only when I want to do tests by going to `chrome://extensions/` in my browser and toggling the extension on and off.

Here's a video of what the component looks and sounds like when you tab through it:

<video controls style="width: 100%;"><source src="https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2F2020%2F04%2Fbarc%2Fbarc-01-screen-screen-reader.mov?alt=media&token=a7170255-f499-44c8-b7ab-f4a0a44da728" /></video>

## 8. Add Automated Tests

The tests for this component should be very straightforward since there's no interaction or state changes going on. We don't need to test what happens on click and there's no computation or anything of like going on. This component just loads and shows things, that means the only thing we can really test for is that everything shows correctly on load. We'll be using [Jest](https://jestjs.io/docs/en/getting-started.html) and [Enzyme](https://enzymejs.github.io/enzyme/docs/guides/jest.html) for testing.

### Setting up Enzyme

First, we need to [install and configure Enzyme](https://enzymejs.github.io/enzyme/docs/installation/react-16.html). You can skip to the next section if you've already got it working.

1. Run `npm i --save-dev enzyme enzyme-adapter-react-16` in your terminal to install Enzyme with npm

2. Add the following code to the end of the `setupTests.js` file to configure Enyzme:

```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

### Writing the tests

Since the file is short, I'll paste it now and then walk through what's going on.

```js
import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumb from './Breadcrumb';

const testLinks = [
  { label: 'Test Link 1', href: 'test-link-1' },
  { label: 'Test Link 2', href: 'test-link-2' },
];

describe('<Breadcrumb />', () => {
  it('renders successfully with the correct aria attributes', () => {
    const wrapper = shallow(<Breadcrumb links={testLinks} />);

    const nav = wrapper.find('nav');
    expect(nav).toHaveLength(1);
    expect(nav.props()['aria-label']).toBe('Breadcrumb');

    const anchorElements = wrapper.find('a');
    expect(anchorElements).toHaveLength(testLinks.length);

    const firstAnchor = anchorElements.first();
    expect(firstAnchor.text()).toBe(testLinks[0].label);
    expect(firstAnchor.props()['href']).toBe(testLinks[0].href);

    const lastAnchor = anchorElements.last();
    expect(lastAnchor.props()['aria-current']).toBe('page');
  });
});
```

After all the necessary imports, we have a `testLinks` constant that holds the test values we need to perform our tests. It's good practice to store test values rather than hardcoding them inline for the same reason we don't want to do it in other code: it makes it easier to modify the test values. It's not fun trying to update a bunch of strings in a test file with a few hundred lines of code. Variables are so easy to reference in tests!

Then, we have our main [`describe`](https://jestjs.io/docs/en/api#describename-fn) block that groups all of the tests for this component. We have a single `it` block (alias for [`test`](https://jestjs.io/docs/en/api#testname-fn-timeout)) which runs our single test. In our test, we can then call as many [`expect`s](https://jestjs.io/docs/en/expect#expectvalue) as we want. We've got quite a few here, so let's see what each one testing.

1. First, we shallow render the component. This is an Enzyme concept and you can read about it and it's API Reference [at this link](https://enzymejs.github.io/enzyme/docs/api/shallow.html).

2. One of our specifications for the component is that it wraps everything in a `<nav>` element and that the element has `aria-label="Breadcrumb"` on it. We test for that by using [`find`](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/find.html). We only want there to be 1 element, so that's what the first expect is accomplishing. Then, we want to check the [`props`](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/props.html) on the `nav` and make sure the `aria-label` prop is correctly set to `"Breadcrumb"`.

3. Next, we want to make sure the correct number of anchor elements are being rendered based on the input given to the component through the `links` prop. Similar to the previous step, we `find` all the `<a>` elements and then expect that there are as many found as we have in our `testLinks` array.

4. Now we can look at the first link rendered to make sure it has both a `label` and `href` being rendered correctly. We get the first anchor element using the handy [`first`](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/first.html) method. Then we expect it's [`text`](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/text.html) to match the first test link's `label`. Finally, we check the `props` on the element and make sure `href` is set to the test link's `href`. _Note: we only need to perform these expects on the first element because if the first element is rendered correctly, then all the others are too._

5. Last but not least, we need to make sure the last anchor element has the `aria-current` attribute set to `"page"`. And you guessed it! Enzyme also has a [`last`]() method to go with `first`. Similar to how we checked the `aria-label` prop in 2, we expect it to have the string value of `"page"`.

## 9. Write the Documentation

We're almost done! Let's get the documentation written out and then we can admire our beautiful new component as a whole.

1. Open up the Breadcrumb's `README.md` and add an H1 heading and a description/purpose of the component.

```md
# Breadcrumb

This component displays a list of links to show users where they are within an application.
```

2. Add an H2 heading for Properties. This is where we'll describe the props passed into the component. This should be in a table in your file, but for formatting purposes, I am listing them below as a list.

```md
## Properties

**Links**

- Type: Array
- Required: Yes
- Default value: None
- Description: These are the links to show in the breadcrumb. Each has a `label` and an `href` attribute.
```

3. Add another H2 heading for Accessibility. We'll detail keyboard interaction, WAI-ARIA roles, states, and properties, and additional features, just like the WAI-ARIA site does.

```md
## Accessibility

### Keyboard Interaction

Not applicable.

### WAI-ARIA Roles, States, and Properties

- The links are contained in an ordered list within a `<nav>` element
- The `<nav>` element has the `aria-label` attribute set to `"Breadcrumb"`
- The last link in the list represents the current page, and must have `aria-current` set to `"page"`

### Additional Features

- The separators between each link are added via CSS so they are not presented by a screen reader
```

4. Last but not least, we add an H2 heading for Usage. This is where we'll put some code examples for how to use the component.

```md
## Usage

<Breadcrumb
links={[
{ label: "Link 1", href: "" },
{ label: "Link 2", href: "" },
{ label: "Link 3", href: "" }
]}
/>
```

## Conclusion

And that's it! We have an accessible Breadcrumb component. We still have many more accessible React components to make and it's been so much fun this far. Make sure to [follow my channel](https://twitch.tv/ashleemboyer) so you're notified every time I go live!
