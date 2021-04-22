'use strict';

const
    { dest, src, watch, series, parallel } = require('gulp'),

    /**
     * Project settings */
    project = require('./project-config.js'),

    /**
     * Project mode */
    mode = require('gulp-mode')({
        modes: ["production", "development"],
        default: "development",
        verbose: false
    }),

    /**
     * Project mode is development?! */
    isDevelopment = mode.development(),

    /** Project settings */
    options = project.options,

    /** Project directories */
    folder = project.folder,

    /** Project pages */
    pages = project.pages,

    /** Path to project files */
    files = project.files;


/**
 * Build HTML files */
function build_html() {
    const
        include  = require('posthtml-include'),
        replace  = require('buffer-replace'),
        postHTML = require('gulp-posthtml'),
        tap      = require('gulp-tap');

    return src([files.pages, files.ignore.html])
        .pipe(postHTML([include({
            encoding: 'utf8',
            root: folder.pages
        })]))
        // Transformation
        .pipe(mode.development(tap(file => {
            if (pages[file.stem]) {
                const
                    mark = '</head>',
                    style = pages[file.stem].style;

                // Add development <style> to content
                if (style) file.contents = replace(Buffer(file.contents), mark, `${ style }\n${ mark }`);
            }
        })))
        .pipe(dest(folder.dist.pages))
}

/**
 * Build SCSS files */
function build_scss() {
    const
        autoprefixer = require('autoprefixer'),
        sourceMap = require('gulp-sourcemaps'),
        minCSS  = require('gulp-clean-css'),
        postCSS = require('gulp-postcss'),
        sass = require('gulp-sass');

    return src(files.style)
        .pipe(mode.development(sourceMap.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(postCSS([autoprefixer()]))
        .pipe(mode.development(sourceMap.write('./')))
        .pipe(mode.production(minCSS()))
        .pipe(dest(folder.dist.style));
}

/**
 * Build js files */
function build_js() {
    const
        uglify = require('gulp-uglify'),
        babel = require("gulp-babel");

    return src([files.script, files.ignore.test])
        .pipe(babel(options.babel))
        .pipe(mode.production(uglify()))
        .pipe(dest(folder.dist.script));
}

/**
 * Testing js files */
function test() {
    const mocha = require('gulp-mocha');

    return src(files.test, {read: false})
        .pipe(mocha(options.mocha))
}

/**
 * Style minification */
function beautify_html() {
    const beautify = require('gulp-beautify');

    return src(files.dist.pages)
        .pipe(beautify.html(options.codeStyle))
        .pipe(dest(folder.dist.pages));
}

/**
 * Copy assert files */
function copy_files() {
    return src([files.assert, files.ignore.md])
        .pipe(dest(folder.dist.folder));
}

/**
 * Remove "dist" directory */
function delete_dist() {
    const del = require('del');
    return del(folder.dist.folder);
}

/**
 * Monitor project files */
function runWatcher() {
    watch(folder.pages + '**/*.html', series(build_html, beautify_html));
    watch(folder.style + '**/*.scss', series(build_scss));
    watch([
        folder.script + '**/*.test.js',
        `!${ folder.script }**/*.test.js`
    ], series(build_js));
    // watch(folder.script + '**/*.test.js', series(test));
    watch(folder.assert + '**/*.*', copy_files);
}

/**
 * Run local server */
function runServer() {
    const broSync = require('browser-sync').create();
    broSync.init({
        watch: true,
        watchOptions: {
            ignoreInitial: true,
            ignored: ['*.log', '*.md']
        },
        server: {
            index: "./",
            baseDir: folder.dist.folder,
            directory: true
        }
    });
    runWatcher();
}

// TODO
// https://www.npmjs.com/package/gulp-json-editor
// https://www.npmjs.com/package/json

/**
 * --- Exports tasks --- */
exports.html = build_html;
exports.scss = build_scss;
exports.js   = build_js;
exports.copy = copy_files;

exports.server = runServer;
exports.watch  = runWatcher;
exports.test   = test;

/**
 * --- Export main task --- */
exports.build = series(
    delete_dist, parallel(
        series(build_html, beautify_html),
        series(build_scss),
        series(build_js),
        copy_files
    )
);
