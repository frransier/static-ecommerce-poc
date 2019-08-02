## [1.2.1] - 2019-06-20

### Added

- **222** - Add handlebars-layouts package
- **211** - Add documentation about SCSS modifiers
- **213** - BEM and positioning

### Changed

- **150** - Do not convert hex colors to rgb in the documentation
- **212** - Documentation structuring

### Removed

### Bug fixes

- **227** - Path for assets incorrect in export

## [1.2.0] - 2019-05-17

### Added

- **17** - Add linters to build task
- **164** - Add NodeJS version control
- **179** - Add list-clean mixin from Warp
- **188** - Configurations to get the spread syntax working
- **194** - Add JavaScript helpers
- **197** - Improve polyfill use
- **199** - Add helper class hide-for-print

### Changed

- **184** - Ignore/Invert attribute-hyphenation rule in Vue linting
- **196** - Upgrade Webpack to v4
- **195** - Upgrade vue-loader to v15
- **198** - Get JS hot reload working also when the integration server acts as proxy

### Removed

- **180** - Remove legacy code (Bootstrap) in _variables.scss

### Bug fixes

- **185** - CSS not auto injected
- **187** - Missing Eslint packages
- **191** - CSS and JS paths in Fractal export are incorrect
- **192** - VueJS - error

<hr>

## [1.1.2] - 2018-09-18

### Added

- **168** - Decide about color variables
- **173** - Provide snippets
- **169** - Add media-queries mixin
- **167** - Add customBodyClasses to _preview.hbs

### Changed

- **172** - Evaluate Vue linting
- **170** - Evaluate breakpoints

### Removed

- **171** - BEM linter throws incorrect errors

### Bug fixes

<hr>

## [1.1.1] (hot fix) - 2018-08-30

- **166** - Gulp task: SVG path is wrong

<hr>

## [1.1.0] - 2018-08-23

### Major changes or additions

- **154** - Add folders for atomic design taxonomy
- **125** - Add support for VueJS

### Added
- **142** - Add documentation regarding creating components
- **119** - Document sass mixins and functions
- **110** - Add NPM script to enable local Gulp
- **147** - Add gulp task that compiles dev files but doesn't start any servers
- **141** - Add aliases in Webpack to simplify imports
- **145** - Vue in components
- **148** - Add BEM linting
- **149** - Enhance integration server auto reload
- **153** - Expand on documentation for working with SVGs

### Changed
- **105** - Come up with standard for grouping of components
- **132** - Generate _preview.hbs with Webpack

### Removed
- **63** - Keep third party code out of core (remove Bootstrap grid)

### Bug fixes

<hr>

## [1.0.2] - 2018-07-13

### Added

- **65** - Create setting for using ESLint overlay
- **13** - StandardJS: Add possibility to run "fix" automatically (if possible)
- **129** - Add Babel polyfill
- **131** - Listing of default variables
- **143** - Add mixin to check if browser is IE

### Changed

- **135** - Autoreload when editing components config files
- **136** - Do not run Webpack for .config.js files
- **138** - Copying of SVG files
- **140** - Create user settings file
- **144** - Enhance logic for using hot reload or not
- Updated wiki about the new additions and changes in this release

### Removed

### Bug fixes

- **116** - Browserlist default config and autoprefixer
- **137** - Fractal server inject CSS
- **139** - Hot reload makes JS bundle file load twice
- **146** - Webpack doesn't display linting errors.

<hr>

## [1.0.1] - 2018-03-29

### Added
- **124** - Setting for Fractal static.path
- **64** - Removes console.log in production build

### Changed

- **123** - Using 4 spaces instead of 2 as indentation
- Updated Wiki about readme for components (component info removed från SCSS files to README.md)
- Updated wiki about the new additions in this release

### Removed

### Bug fixes

- **127** - Node-sass added as devDependency
- **128** - Added component folder and _preview.hbs
- **118** - Hot reload JS
