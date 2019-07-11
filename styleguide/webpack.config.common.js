const settings = require('./settings')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path')

//
// Common config
//

// Important: entry & output folders are set in aggressive-koala.project.settings.js
const config = {
    context: path.join(__dirname, settings.paths.src.js),
    entry: {}, // Note: The entries are added in the dev and prod config files
    output: {
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint-loader',
                options: {
                    // The Eslint-loader says that emitWarning should be set to true; "If you're using hot module replacement, you may wish to enable this in development, or else updates will be skipped when there's an eslint error".
                    // Though using true prevents using the error overlay, and when the overlay is used the build fails and that's no issue in dev enviroment.
                    emitWarning: !settings.plugins.eslint.useErrorOverlay,
                    emitError: true,
                    failOnWarning: true,
                    failOnError: true,
                    fix: settings.plugins.eslint.useAutoFix
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // Includes the Vue compiler
            '@': path.resolve(__dirname, 'src/js'),
            'Atoms': path.resolve(__dirname, 'src/components/01-atoms'),
            'Molecules': path.resolve(__dirname, 'src/components/02-molecules'),
            'Organisms': path.resolve(__dirname, 'src/components/03-organisms'),
            'Templates': path.resolve(__dirname, 'src/components/04-templates'),
            'Pages': path.resolve(__dirname, 'src/components/05-pages')
        }
    }
}

module.exports = config
