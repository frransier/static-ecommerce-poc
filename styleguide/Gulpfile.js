//
// Dependencies
//

// Config files
const settings = require('./settings')
const packageJson = require('./package.json')
const gulpHelpers = require('./gulp.helpers')
const webpackDevConfig = require('./webpack.config.dev')
const webpackProdConfig = require('./webpack.config.prod')
const fractalSetup = require('./fractal')

// Packages
const path = require('path')
const rimraf = require('rimraf')
const gulp = require('gulp')
const sequence = require('gulp-sequence')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const sourceMaps = require('gulp-sourcemaps')
const autoPrefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const browserSync = require('browser-sync').create('IntegrationServer')
const gulpStylelint = require('gulp-stylelint')
const htmlhint = require('gulp-htmlhint')
const webpack = require('webpack')
const newer = require('gulp-newer')
const svgstore = require('gulp-svgstore')
const svgmin = require('gulp-svgmin')
const octo = require('@octopusdeploy/gulp-octo')

//
// Tasks that gets the job done
//

// SASS
gulp.task('sass:compile', function () {
    return gulp
        .src(`${settings.paths.src.sass}/${settings.files.sassMainImportFile}`)
        .pipe(sassGlob())
        .pipe(sourceMaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat(`${settings.projectName}.css`))
        .pipe(autoPrefixer())
        .pipe(sourceMaps.write('source-maps'))
        .pipe(gulp.dest(settings.paths.dev.css))
        .pipe(browserSync.stream())
})

// SASS Lint
// Important: we're excluding third party code from linting
gulp.task('sass:lint', ['sass:compile'], function () {
    return gulp
        .src([
            `${settings.paths.src.components}/**/*.scss`,
            `${settings.paths.src.sass}/**/*.scss`,
            `!${settings.paths.src.sass}/core/_reset.scss`,
            `!${settings.paths.src.sass}/vendor/**/*.scss`
        ])
        .pipe(
            gulpStylelint({
                failAfterError: true,
                reporters: [
                    {
                        formatter: 'string',
                        console: true
                    }
                ]
            })
        )
})

// Htmlhint
gulp.task('htmlhint:validate', function () {
    return gulp
        .src(
            gulpHelpers.extendArrayWithPaths(
                settings.plugins.htmlhint.fileTypes,
                settings.paths.src.root
            )
        )
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
})

// Browsersync
gulp.task('browsersync:init', function () {
    const serverToRun = settings.servers.run

    switch (serverToRun) {
    case 'fractal':
        gulpHelpers.startFractalServer()
        break
    case 'integration':
        browserSync.init(gulpHelpers.generateServerSettings(serverToRun))
        break
    case 'both':
        sequence(
            gulpHelpers.startFractalServer(),
            browserSync.init(gulpHelpers.generateServerSettings('integration'))
        )
        break
    default:
        console.log(
            'Error: No valid value provided for property servers.run in settings.js!'
        )
        break
    }
})

// Copy all files (not js or sass) from src root to dev root
gulp.task('copy-static:src-to-dev:all', function () {
    return gulp
        .src(gulpHelpers.getSrcFilesToCopy(), { nodir: true })
        .pipe(gulp.dest(settings.paths.dev.root))
})

// Copy only changed files (not js or sass) from src root to dev root
gulp.task('copy-static:src-to-dev:changed', function () {
    return gulp
        .src(gulpHelpers.getSrcFilesToCopy(), { nodir: true })
        .pipe(newer(settings.paths.dev.root))
        .pipe(gulp.dest(settings.paths.dev.root))
})

// Copy all static files from dev to prod
gulp.task('copy-static:dev-to-prod:all', function () {
    return gulp
        .src(gulpHelpers.getDevFilesToCopy(), { nodir: true })
        .pipe(gulp.dest(settings.paths.prod.root))
})

// Watchers
gulp.task('watchers', function () {
    // SCSS files
    gulp.watch(
        [
            `${settings.paths.src.sass}/**/*.scss`,
            `${settings.paths.src.components}/**/*.scss`
        ],
        ['sass:lint']
    )
    // HtmlHint
    gulp.watch(
        gulpHelpers.extendArrayWithPaths(
            settings.plugins.htmlhint.fileTypes,
            settings.paths.src.root
        ),
        ['htmlhint:validate']
    )
    // JS files
    gulp.watch([
        `${settings.paths.src.js}/**/*.js`,
        `${settings.paths.src.js}/**/*.vue`,
        `${settings.paths.components}/**/*.js`
    ],
    ['webpack:dev'])
    // SVG icons
    gulp.watch(`${settings.paths.src.iconSpriteIn}/**/*.svg`, ['svg-icon-sprite'])
    // Static files
    gulp.watch(gulpHelpers.getSrcFilesToCopy(), [
        'copy-static:src-to-dev:changed'
    ])
    // Defined files that triggers reload
    gulp.watch(gulpHelpers.getFileTypesToReload()).on('change', browserSync.reload)
})

// Minification of CSS, JS and images (for production).
// Minify runs all minification subtasks.
gulp.task('minify', ['minify:css'])

// Minify CSS
gulp.task('minify:css', function () {
    return gulp
        .src(`${settings.paths.dev.css}/${settings.projectName}.css`)
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(settings.paths.prod.css))
})

// svg sprites
gulp.task('svg-icon-sprite', () => {
    return gulp
        .src(`${settings.paths.src.iconSpriteIn}/**/*.svg`)
        .pipe(
            svgmin(() => {
                // NOTE: imagemin should be taking care of this, but it generates an empty svg document for some reason
                return {
                    plugins: [
                        { cleanupIDs: { minify: true } }
                    ]
                }
            })
        )
        .pipe(svgstore())
        .pipe(rename('icon-sprite.svg'))
        .pipe(gulp.dest(settings.paths.dev.icons))
})

// Webpack
gulp.task('webpack:dev', function () {
    webpack(webpackDevConfig).run(function () { })
})

gulp.task('webpack:prod', function () {
    webpack(webpackProdConfig).run(function () { })
})

//
// Tasks to run
//

// Use dev while developing, it starts the desired servers and runs for example SASS watch.
gulp.task('dev', function (cb) {
    sequence(
        'svg-icon-sprite',
        'copy-static:src-to-dev:all',
        'sass:lint',
        ['browsersync:init', 'webpack:dev'],
        'watchers',
        cb
    )
})

// Development build, only compiles files in development mode but doesn't start any servers or such.
gulp.task('build:dev', function (cb) {
    sequence(
        ['sass:lint', 'webpack:dev'],
        'svg-icon-sprite',
        'copy-static:src-to-dev:all',
        cb
    )
})

// Production build
gulp.task('build:prod', function (cb) {
    sequence(
        'sass:lint',
        'webpack:prod',
        'svg-icon-sprite',
        ['minify', 'copy-static:src-to-dev:changed'],
        'copy-static:dev-to-prod:all',
        cb
    )
})

// Does a development build to a temporary folder (export-build) and makes a Fractal export
gulp.task('publish', function (cb) {
    // If settings.paths.fractal.serverRoot and ...paths.dev.root differs, the difference in the structure is added to the path so that it gets correct in the export.
    // This is common in Warp projects where dev.root is the Umbraco "Content" folder, while fractal.serverRoot is the Umbraco root folder. In such case, pathDifference would be "Content".
    const pathDifference = path.relative(settings.paths.fractal.serverRoot, settings.paths.dev.root)

    // Change the paths to the temporary folder
    settings.paths.fractal.serverRoot = 'export-build'
    settings.paths.dev = {
        root: `export-build${pathDifference.length ? `/${pathDifference}` : ''}`,
        icons: `export-build${pathDifference.length ? `/${pathDifference}` : ''}/${path.relative(settings.paths.dev.root, settings.paths.dev.icons)}`,
        css: `export-build${pathDifference.length ? `/${pathDifference}` : ''}/${path.relative(settings.paths.dev.root, settings.paths.dev.css)}`,
        js: `export-build${pathDifference.length ? `/${pathDifference}` : ''}/${path.relative(settings.paths.dev.root, settings.paths.dev.js)}`
    }

    webpackDevConfig.output.path = path.join(__dirname, settings.paths.dev.js)
    settings.plugins.webpack.useJsHotReload = false // Not necessary to have HMR active when exporting

    // Run needed functions, one after another when they are finished
    sequence(
        'build:dev',
        'export',
        'delete-export-folder',
        cb
    )
})

gulp.task('delete-export-folder', function () {
    rimraf('./export-build', function () {
        console.log('Deleted export build folder.')
    })
})

gulp.task('export', async () => {
    // Change the static.path setting in Fractal to the temporary folder.
    // The Fractal export will copy all files in that folder, meaning that we could potentially get a whole site exported instead of just the style guide.
    const rootDir = path.join(__dirname, '/')
    fractalSetup.web.set('static.path', path.resolve(rootDir + 'export-build'))

    // For some unknown reason, Fractal occasionally skips to include the CSS or JS folder if not delaying the export for a few seconds.
    console.log('Exporting Fractal styleguide. This might take a while, hang on...\n')

    const doExport = await gulpHelpers.exportStyleguide()
    const errorCount = doExport.errorCount
    if (errorCount === 0) {
        console.log('Successfully exported the styleguide, yehaa!\n')
    } else {
        console.log('Damn it, something went wrong with the Fractal export and the publish has been aborted! :(')
        console.log(`Fractal reports a total of ${errorCount} error(s).\n`)
    }
})

gulp.task('publish:bitter', async () => {
    if (settings.projectName === 'aggressive-koala') {
        console.log('Exporting Fractal styleguide. This normaly takes a few seconds, hang on...\n')

        const doExport = await gulpHelpers.exportStyleguide()
        const errorCount = doExport.errorCount
        if (errorCount === 0) {
            console.log('Successfully exported the styleguide, yehaa!\n')
            console.log('Starting deploy to Bitter Eucalyptus, how exciting..!\n')

            return gulp
                .src(`${settings.paths.fractal.styleguideExport}/**`)
                .pipe(octo.pack({ version: packageJson.version }))
                .pipe(
                    octo.push({
                        apiKey: 'API-6TUO8INCOWKWHMPP46Y23PDT3S',
                        host: 'https://octopus.wipcore.se/'
                    })
                )
        } else {
            console.log('Damn it, something went wrong in the Fractal export and the publish has been aborted! :(')
            console.log(`Fractal reports a total of ${errorCount} error(s).\n`)
        }
    }
})

// Default to dev task
gulp.task('default', ['dev'])
