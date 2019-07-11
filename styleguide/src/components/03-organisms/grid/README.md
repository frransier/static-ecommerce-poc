# Grid v1.0.0

A grid made with CSS grid and with a fallback to a flex solution for older browsers.
The default number of columns is set to 12 but can be changed in the SCSS file along with gutters.

Each cell is a `grid__item` element which is handled as a separate component in the styleguide regarding HBS and a related config file.
This is because it's otherwise not possible to reuse it and loop out several items in a grid.

## How to use

### Size property on grid__item

You can define a size property (1 to max number of columns - 1) on grid__item. By default, a grid__item spans the max number of columns.
The size defines how many columns an item shall span. Make sure that the total size sum for all items matches the max number of columns, otherwise
weird behaviour might occur - especially for older browsers that rely on the flex fallback!

The size is not responsive but can be overwritten, read more below.

### Define number of columns on grid

It's possible to define directly on the grid element how many columns there should be in a specific viewport. This affects how many grid items that
are displayed per row (**Note: This will overwrite any size defined on an item.**) as there's one grid item displayed per column.
Properties that can be used:
- columnsXs
- columnsSm
- columnsMd
- columnsLg
- columnsXl

For example, if you define columnsXs as 2, there will be two grid items displayed per row.

## Author(s)

Mikael Karlsson
Sebastian Gelotte

## Dependencies



## Browser compatibility

Tested in the following browsers:

- Chrome 72 (also on Android)
- Firefox 66
- Edge
- IE 11*
- Safari 11 (also on iOS)

* IE fallbacks to a flex grid system while modern non shitty browsers use CSS grid.

## Changelog

