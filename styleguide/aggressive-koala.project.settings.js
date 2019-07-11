//
// Project settings
//

const packageJson = require('./package.json')

module.exports = {
    projectName: packageJson.name,
    ignoreToCopy: [],
    paths: {
        src: {
            root: 'src',
            assets: 'src/assets',
            icons: 'src/assets/icons',
            iconSpriteIn: 'src/assets/icons/icon-sprite-in',
            images: 'src/assets/images',
            fonts: 'src/assets/fonts',
            components: 'src/components',
            componentDocs: 'src/docs',
            js: 'src/js',
            sass: 'src/scss'
        },
        dev: {
            root: 'build/dev',
            icons: 'build/dev/assets/icons',
            css: 'build/dev/css',
            js: 'build/dev/js'
        },
        prod: {
            root: 'build/prod',
            css: 'build/prod/css',
            js: 'build/prod/js'
        },
        fractal: {
            styleguideExport: 'fractalstyleguide',
            serverRoot: 'build/dev' // Usually the same as paths.dev.root
        }
    },
    files: {
        sassMainImportFile: 'style-import.scss'
    },
    plugins: {
        babel: {
            useBabelPolyfill: true
        },
        webpack: {
            generatePolyfillFile: false
        },
        htmlhint: {
            fileTypes: ['*.html']
        }
    }
}
