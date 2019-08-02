const settings = require('./settings')
const commonConfig = require('./webpack.config.common')

const path = require('path')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// Merge the common config and the dev specific configurations
const prodConfig = merge(commonConfig, {
    mode: 'production',
    output: {
        path: path.join(__dirname, settings.paths.prod.js),
        filename: '[name].min.js'
    },
    devtool: false, // Check options here if source maps are needed: https://webpack.js.org/configuration/devtool/
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    }
})

//
// Configurations based on project settings
//

// Entries
const mainEntry = ['./index.js']

if (settings.plugins.babel.useBabelPolyfill) {
    if (settings.plugins.webpack.generatePolyfillFile) {
        prodConfig.entry[`${settings.projectName}-polyfills`] = ['babel-polyfill', './polyfills.js']
    } else {
        mainEntry.unshift(...['babel-polyfill', './polyfills.js']) // Note: babel-polyfill needs to be placed first, hence the use of unshift.
    }
}

prodConfig.entry[`${settings.projectName}`] = mainEntry

module.exports = prodConfig
