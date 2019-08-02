# Section v2.1.0

The Section component is made for wrapping __content sections__ and provide responsive positioning and paddings. For thoose familiar with Bootstrap, the Section component is quite similar to the .container.

Important to remember when developing components that are supposed to live in a Section, is that the content doesn't need to handle any "outer" padding to align with other content sections on the page.

## Author(s)

Mikael Karlsson
Sebastian Gelotte

## Grid

It's possible to use the `section--grid` modifier together with `section` to create a grid system.
Create columns by using the Section-grid-column component (atom). This is also where you can decide the number of columns!

**Important**
`section--grid` has to use negative margins which has the caveat that it cannot automatically center itself horizontally, like `section` normally does.
Center `section--grid` via the parent element, preferably a `section` using the `section--full`, `section--no-padding` and `section--center-content` modifiers.

**WARP**
In Umbraco, the Section component is used instead of Bootstrap to handle grid content. There are several modifiers to use and they are possible to choose in Umbraco Back office in the grid row settings.
If the number of columns is changed (from 12) it also has to be changed in the grid configuration in Umbraco Back office, as well as in the view template in Umbraco (that generates the markup).

## Dependencies

- `mq` mixin

## Browser compatibility

The component has been tested in the following browsers:

- Chrome 72
- Firefox 65
- Edge 42
- IE 11
- Safari 12 (also on iPhone)

Read about flexbox support here: https://caniuse.com/#feat=flexbox

## Reference material

- https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- https://css-tricks.com/flex-grow-is-weird/

## Changelog

### v2.1.0
- Reworked `section--grid`

### v2.0.0

- Implemented "blocks" to provide several partial blocks. Removed lonely header template.

### v1.2.0

- Moved all SCSS variables to component file and changed width handling and values

### v1.1.0

- Reworked the grid, moving the column into a separate component
