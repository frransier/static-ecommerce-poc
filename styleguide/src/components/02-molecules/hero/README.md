# Hero component v1.2.0

Displays a large image and CTA button with a link.

## Regular headline (serif font)

This variant is **only** used for displaying a REPORTAGE.

## Headline2 (sans serif font)

This variant is used for displaying everything **except** a REPORTAGE.

## Author(s)

Madeleine Olson
Sebastian Gelotte
Mikael Karlsson
Anders Kleve

## Dependencies

- `mq` mixin

## Browser compatibility

Tested in the following browsers:

- Chrome 72
- Firefox 64
- IE11
- Edge 42
- Chrome on Android
- Safari 12 on Mac
- Safari on iPhone

## Todo

- Document usage, such as when to use the variants

## Changelog

### v1.2.0

- Removed is-link variant since there seems to be no need for it
- Added text-left & text-right variants
- Added 16:9 (sort of) aspect ratio when moving above $breakpoint-sm. It grows until it reaches a maximum height.
- Removed line-clamping - let it grow!


### v1.1.0

- Created is-link variant and made default as a simple div element.
- Moved background-color from inline style to SCSS.
