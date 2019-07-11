const settings = require('./settings')
const commonConfig = require('./webpack.config.common')

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

// Merge the common config and the dev specific configurations
const devConfig = merge(commonConfig, {
    mode: 'development',
    output: {
        path: path.join(__dirname, settings.paths.dev.js),
        filename: '[name].js',
        hotUpdateChunkFilename: 'hot/hot-update.js', // Needed to avoid 404 errors, see https://github.com/webpack/webpack-dev-server/issues/79#issuecomment-244596129
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    devtool: 'inline-source-map',
    plugins: []
})

//
// Configurations based on project settings
//

// Entries
const mainEntry = settings.plugins.webpack.useJsHotReload ? ['./index.js', 'webpack-hot-middleware/client'] : ['./index.js']

if (settings.plugins.babel.useBabelPolyfill) {
    if (settings.plugins.webpack.generatePolyfillFile) {
        devConfig.entry[`${settings.projectName}-polyfills`] = settings.plugins.webpack.useJsHotReload ? ['babel-polyfill', './polyfills.js', 'webpack-hot-middleware/client'] : ['babel-polyfill', './polyfills.js']
    } else {
        mainEntry.unshift(...['babel-polyfill', './polyfills.js']) // Note: babel-polyfill needs to be placed first, hence the use of unshift.
    }
}

devConfig.entry[`${settings.projectName}`] = mainEntry

// Add JS HMR plugin if activated
if (settings.plugins.webpack.useJsHotReload) {
    devConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = devConfig
