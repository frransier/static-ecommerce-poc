const settings = require('./settings.js')
const webpackDevConfig = require('./webpack.config.dev.js')
const fractal = require('./fractal.js')

const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const fs = require('fs')

module.exports = {
    generateServerSettings (server) {
        const serverSettings = {}
        const webpackCompiler = webpack(webpackDevConfig)

        // Integration server settings
        if (server === 'integration') {
            const proxyTarget = settings.servers.integration.proxyTarget
            if (proxyTarget) {
                serverSettings.proxy = {
                    target: proxyTarget
                }
            } else {
                serverSettings.server = {
                    'baseDir': settings.paths.dev.root
                }
            }

            // Set ports
            serverSettings.port = settings.servers.integration.port
            serverSettings.ui = { port: settings.servers.integration.uiPort }

            // Configurations if JS HMR is activated
            if (settings.plugins.webpack.useJsHotReload) {
                serverSettings.middleware = [
                    webpackDevMiddleware(webpackCompiler, {
                        stats: 'errors-only',
                        publicPath: '/'
                    }),
                    webpackHotMiddleware(webpackCompiler)
                ]

                // Note: Fractal reloads Browsersync on js changes by default, so we want to override that behaviour in favour of HMR.
                serverSettings.ignore = [
                    path.resolve(`${settings.paths.dev.js}/**/*.js`),
                    path.resolve(`${settings.paths.src.components}/**/*.js`),
                    path.resolve(`${settings.paths.src.js}/**/*.vue`)
                ]
            }

            // Inject HTML
            const injectHtml = settings.servers.integration.injectHtml
            if (injectHtml) {
                serverSettings.plugins = [{
                    module: 'bs-html-injector',
                    options: {
                        files: `${settings.paths.dev.root}/**/*.html`
                    }
                }]
            }

            serverSettings.open = true

        // Fractal server settings
        } else if (server === 'fractal') {
            serverSettings.sync = true
            serverSettings.syncOptions = {
                open: true,
                port: settings.servers.fractal.port,
                ui: {
                    port: settings.servers.fractal.uiPort
                },
                watchOptions: {
                    ignoreInitial: true,
                    ignored: [
                        path.resolve(`${settings.paths.src.components}/**/*.scss`) // Fractal compiles scss by default, but we want to do it on our own.
                    ],
                    files: [
                        path.resolve(`${settings.paths.dev.css}/**/*.css`),
                        path.resolve(`${settings.paths.dev.icons}/**/*.svg`)
                    ]
                }
            }

            // JS HMR
            if (settings.plugins.webpack.useJsHotReload) {
                serverSettings.syncOptions.middleware = [
                    webpackDevMiddleware(webpackCompiler, {
                        stats: 'errors-only',
                        publicPath: '/' // Note: Will break JS HMR if set to "/"
                    }),
                    webpackHotMiddleware(webpackCompiler)
                ]

                // Note: Fractal reloads Browsersync on js changes by default, so we want to override that behaviour in favour of HMR if it's activated.
                serverSettings.syncOptions.watchOptions.ignored.push(
                    path.resolve(`${settings.paths.dev.js}/**/*.js`),
                    path.resolve(`${settings.paths.src.components}/**/*.js`),
                    path.resolve(`${settings.paths.src.js}/**/*.vue`)
                )
            }

            // BrowserSync UI has problems running on both the integration and Fractal server at the same time, therefore disable it on the Fractal server if both servers shall run.
            if (settings.devServer === 'both') {
                serverSettings.syncOptions.ui = false
            }
        }

        return serverSettings
    },
    // Start the Fractal server
    startFractalServer () {
        const server = fractal.web.server(this.generateServerSettings('fractal'))
        return server.start().then(() => {
            console.log(`Fractal server is now running at:\nLocal: ${server.url}\nExternal: ${server.urls.sync.external}\nBS UI: ${server.urls.sync.ui}`)
        })
    },
    // Prepend array values with a path
    extendArrayWithPaths (array, path) {
        if (array.length && path) {
            const extendedArray = []
            array.forEach(function (value) {
                extendedArray.push(`${path}/${value}`)
            })
            return extendedArray
        }
    },
    // Get files to copy from src to dev
    getSrcFilesToCopy () {
        const filesToCopy = [`${settings.paths.src.root}/**/*`]
        const ignore = [
            settings.paths.src.components,
            settings.paths.src.js,
            settings.paths.src.sass,
            settings.paths.src.iconSpriteIn,
            settings.paths.src.componentDocs
        ]

        ignore.forEach((ignoreValue) => {
            filesToCopy.push(`!${ignoreValue}`, `!${ignoreValue}/**`)
        })

        if (settings.ignoreToCopy.length) {
            const customIgnored = this.extendArrayWithPaths(settings.ignoreToCopy, settings.paths.src.root)
            customIgnored.forEach((customIgnoreValue) => {
                filesToCopy.push('!' + customIgnoreValue)
            })
        }

        return filesToCopy
    },
    // Get files to copy from dev to prod
    getDevFilesToCopy () {
        const filesToCopy = [`${settings.paths.dev.root}/**/*`]
        const ignore = [
            settings.paths.dev.js,
            settings.paths.dev.css
        ]

        ignore.forEach((ignoreValue) => {
            filesToCopy.push(`!${ignoreValue}`, `!${ignoreValue}/**`)
        })

        return filesToCopy
    },
    // Custom defined file types that should make the Integration server to reload upon changes
    getFileTypesToReload () {
        const fileTypes = []

        settings.servers.integration.fileTypesToReload.forEach(fileType => {
            fileTypes.push(`${settings.paths.dev.root}/**/*.${fileType}`)
        })

        return fileTypes
    },
    // Set version variables
    setTeamcityVersion (env) {
        const buildCounter = this.getTeamcityBuildNumber()
        var teamcityBuild = false
        if (buildCounter) {
            console.log('Running in teamcity.')
            teamcityBuild = true
        }
        const packageJson = JSON.parse(fs.readFileSync('./package.json'))
        const currentVersion = packageJson.version
        var devVersion = currentVersion + '-local'

        if (teamcityBuild) {
            devVersion = currentVersion + '-build' + buildCounter
        }

        if (env === 'prod') {
            return currentVersion
        } else {
            return devVersion
        }
    },
    // Get teamcity buildnumber
    getTeamcityBuildNumber () {
        return tcProps['build.number']
    },
    // Export Fractal styleguide (used for publish to Bitter Eucalyptus)
    exportStyleguide () {
        const builder = fractal.web.builder()
        return builder.build()
    }
}
