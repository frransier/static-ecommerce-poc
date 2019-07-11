# Card v1.0.0

Card component with an optional background image, heading and CTA-text.

The cards are created to make the site more dynamic. And allow the content-creator to mix and match themselfs, regardless if they are using images or not. Also be able to use different cards for different purposes.

## Variants

- Default (don't use this without a modifier)
- With background
- With tag
- With intro text
- With intro text and image

## Author(s)

- Anders Kleve
- Sebastian Gelotte

## Dependencies

- Uses mixin `background-cover` from _mixins.scss

## Browser compatibility

Tested in the following browsers:

- Chrome 72
- Firefox 64
- IE11
- Edge 42
- Chrome on Android
- Safari 12 on Mac
- Safari on iPhone

## Suggestions for improvement

- Block links might be problematic for certain user groups: https://www.filamentgroup.com/lab/a11y-links.html
- `background-blend-mode` not supported on IE11. Can be fixed with a fallback transparent png but is yet to be implemented. This means that there's no transparent background on cards for <= IE11

## Changelog
