# Button icon v1.2.0

Displays a button with an icon (wrapped). Basically a merge of the Button and Icon components.
This component has no own context (even no customClasses or customModifiers) as it extends other components and uses their context.

## Author(s)

Sebastian Gelotte,
Mikael Karlsson

## Dependencies

- `svg-sprite.svg` (*cart* is used as example icon)

## Browser compatibility

Tested in the following browsers:

- Chrome 72
- Firefox 63
- ~~IE 11~~* TODO: check this!

*IE 11 have a weak support for SVG images, check the Icon component readme for more information.

## Changelog

### v1.2.0

- Changed the markup slightly and added text-right and space-between variants.

### v1.1.0

- Removed text from HBS and removed customClasses and customAttributes from data context.
