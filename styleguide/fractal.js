const settings = require('./settings')
const path = require('path')
const sassExtract = require('sass-extract')
const createSassExtractJsPlugin = require('sass-extract-js/lib/plugin')
const rgbHex = require('rgb-hex')
const handlebarsLayouts = require('handlebars-layouts')

const rootDir = path.join(__dirname, '/')

// Create a new Fractal instance and export it for use elsewhere if required
const fractal = require('@frctl/fractal').create('FractalServer')

// Import handlebars and extend it with helpers
const hbs = require('@frctl/handlebars')({
    helpers: {
        projectName: () => {
            return settings.projectName
        },
        cssPath: () => {
            const pathDifference = path.relative(settings.paths.fractal.serverRoot, settings.paths.dev.root)
            const cssFolder = path.relative(settings.paths.dev.root, settings.paths.dev.css)

            return `${pathDifference.length ? `/${pathDifference}` : ''}${cssFolder.length ? `/${cssFolder}` : ''}/${settings.projectName}.css`
        },
        jsPath: () => {
            const pathDifference = path.relative(settings.paths.fractal.serverRoot, settings.paths.dev.root)
            const jsFolder = path.relative(settings.paths.dev.root, settings.paths.dev.js)

            return `${pathDifference.length ? `/${pathDifference}` : ''}${jsFolder.length ? `/${jsFolder}` : ''}/${settings.projectName}.js`
        }
    }
})

// Tell Fractal to use our extended handlebars instance
fractal.components.engine(hbs)

// Register the handlebars layouts package
handlebarsLayouts.register(fractal.components.engine().handlebars)

// Set the title of the project
fractal.set('project.title', `${settings.projectName} component library`)

// Sets the default component status to "Work in progress"
fractal.components.set('default.status', 'wip')

// Tell Fractal where the components will live
fractal.components.set('path', path.resolve(rootDir + settings.paths.src.components))

// Tell Fractal where the documentation pages will live
fractal.docs.set('path', path.resolve(rootDir + settings.paths.src.componentDocs))

// Makes it possible to use documentation files in hbs format
fractal.docs.set('ext', '.hbs')

// Sets the folder which Fractal will use as server root
fractal.web.set('static.path', path.resolve(rootDir + settings.paths.fractal.serverRoot))

// Sets the static HTML build destination
fractal.web.set('builder.dest', path.resolve(rootDir + settings.paths.fractal.styleguideExport))

// Extracts all variables from _variables.scss and makes them available in a Handlebars helper.
const sassExtractJsPlugin = createSassExtractJsPlugin({ camelCase: false })
const scssVariables = sassExtract.renderSync({
    file: `./${settings.paths.src.sass}/utilities/_variables.scss`
}, {
    plugins: [sassExtractJsPlugin]
})

fractal.docs.engine(hbs).handlebars.registerHelper('getSassVariables', () => {
    const variables = []

    // Note: sass-extract-js returns a object with the keys stats, css and vars and vars is the one needed.
    Object.entries(scssVariables.vars).forEach(property => {
        variables.push({
            variable: `$${property[0]}`,
            value: property[0].substr(0, 5) === 'color' ? `#${rgbHex(property[1])}` : property[1],
            isColor: property[0].substr(0, 5) === 'color',
            isFontFamily: property[0].substr(0, 11) === 'font-family',
            isFontSize: property[0].substr(0, 9) === 'font-size'
        })
    })
    return variables
})

// Export config
module.exports = fractal
