# The icon component v2.0.0

Displays an icon from the svg-sprite.svg file.

## Author(s)

Anders Kleve
Sebastian Gelotte
Mikael Karlsson

## Dependencies

- `icon-sprite.svg`

## Accessibility

In cases where you need to implement SVGs in image only buttons, or image only links, the most solid approach at the moment to make them accessible seems to be to provide an adjacent text (inside the button/link) that gets visually hidden. Either by using `.hide-visually` helper class, or by referencing its corresponding sass mixin `@include hide-visually()`.

Example code:

```
<a href="/cart">
  <svg class="icon" aria-hidden="true">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/icons/icon-sprite.svg#cart"></use>
  </svg>
  <span class="hide-visually">Go to the cart</span>
</a>
```

Keep an eye on updated recommendations. There's a couple of other existing techniques, such as providing a `title` tag to the svg, or using the `aria-label` attribute. Have a look at the reference links below for more information on this.

## Browser compatibility

Tested in the following browsers:

- Chrome 72
- Firefox 64
- IE11
- Edge 42
- Chrome on Android
- Safari 12 on Mac
- Safari on iPhone

*Internet Explorer <= 11 fails to load external SVGs referenced in the `use` tag. In cases where you need to support this icon approach in IE, the [svgxuse](https://github.com/Keyamoon/svgxuse) polyfill is a decent solution.

## Todo(s)

- Link to our guide (AK wiki) on implementing polyfills.

## Reference material

A general how to guide with lots of useful information on SVGs

https://fvsch.com/code/svg-icons/how-to/

More on SVGs & accessibility

> Our most recommended approach when it comes to browser support and consistency across screen readers is to add a visually-hidden element as a sibling element to the `<svg>`. With this implementation, we’ve found that all  browser and screen reader combinations tested were able to announce the link with the expected text announcement.

https://simplyaccessible.com/article/7-solutions-svgs/

A guide to the process that inspired our spriting implementation

https://cloudfour.com/thinks/our-svg-icon-process/

## Changelog

### v2.0.0

- Reworked data structure using modifiers instead of properties named size, color etc.
