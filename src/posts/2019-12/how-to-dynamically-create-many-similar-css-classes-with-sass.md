---
title: How to Dynamically Create Many Similar CSS Classes with Sass
date: 2019-12-19
description: Repeated code takes up a lot of space. Sass can help you reduce repetitive and similar CSS code.
image: https://firebasestorage.googleapis.com/v0/b/ashleemboyer-2018.appspot.com/o/images%2Fsass.png?alt=media&token=4035f9c6-3055-4d51-a608-1eb229dfeb05
alt: "Header reading the this blog post's title." 
---

Let's say you allow 5 sizes of icons in your web application and they're in 6-pixel increments: 12, 18, 24, 30, and 36. Your Sass file might have something like the following to handle this:

```
.Icon {
  &--size-12 {
    width: 12px;
    height: 12px;
    font-size: 12px;
  }

  &--size-18 {
    width: 18px;
    height: 18px;
    font-size: 18px;
  }

  &--size-24 {
    width: 24px;
    height: 24px;
    font-size: 24px;
  }

  &--size-30 {
    width: 30px;
    height: 30px;
    font-size: 30px;
  }

  &--size-36 {
    width: 36px;
    height: 36px;
    font-size: 36px;
  }
}
```

These all look really similar, right? The class names all have the same format, and each one sets a `width`, `height`, and `font-size` to be the same thing. Would you believe me if I told you that it's possible to dynamically create blocks of CSS for class names in Sass?

Well, believe me! It's true!

Here's one way you can introduce a `@for` to do this:

```
.Icon {
  @for $i from 1 through 5 {
    $base-size: 12;
    $increment: 6;
    $calculated-size: $base-size + ($i * $increment);

    &--size-#{$calculated-size} {
      width: #{$calculated-size};
      height: #{$calculated-size};
      font-size: #{$calculated-size};
    }
  }
}
```

What if you don't have even increments, though? You can also loop through an array of values like this:

```
$icon-sizes: 12, 16, 32, 48;

.Icon {
  @each $size in $icon-sizes {
    &--size-#{$size} {
      width: #{size}px;
      height: #{size}px;
      font-size: #{size}px;
    }
  }
}
```
