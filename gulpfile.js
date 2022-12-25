'use strict';

const { dest, src, watch, series, parallel } = require('gulp');
const sourceMap = require('gulp-sourcemaps');
const mode = require('gulp-mode')({
  modes: ['production', 'development'],
  default: 'development',
  verbose: false,
});

const { config, foldersPath, filesPath } = require('./core/project-config.cts');
const { addStyleToFile } = require('./core/helper.cts');
const ROOT = './';

function buildPages() {
  const include = require('posthtml-include');
  const postHTML = require('gulp-posthtml');
  const tap = require('gulp-tap');

  return src([filesPath.pages, filesPath.ignore.html])
      .pipe(postHTML([include({ ...config.postHTML, root: foldersPath.pages })], {}))
      .pipe(mode.development(tap(addStyleToFile)))
      .pipe(dest(foldersPath.dist.pages));
}

function buildStyles() {
  const autoprefixer = require('autoprefixer');
  const sourceMap = require('gulp-sourcemaps');
  const minCSS = require('gulp-clean-css');
  const postCSS = require('gulp-postcss');
  const sass = require('gulp-sass')(require('sass'));

  return src(filesPath.rootStyles)
      .pipe(mode.development(sourceMap.init(config.sourcemaps)))
      .pipe(sass(config.scss, {}).on('error', sass.logError))
      .pipe(postCSS([autoprefixer()], config.postCSS))
      .pipe(mode.development(sourceMap.write(ROOT, config.writeSourcemaps)))
      .pipe(mode.production(minCSS()))
      .pipe(dest(foldersPath.dist.style));
}

function buildScripts() {
  const uglify = require('gulp-uglify');
  const babel = require('gulp-babel');

  return src([filesPath.scripts, filesPath.ignore.test])
      .pipe(mode.development(sourceMap.init(config.sourcemaps)))
      .pipe(babel(config.babel))
      .pipe(mode.production(uglify()))
      .pipe(mode.development(sourceMap.write(ROOT, config.writeSourcemaps)))
      .pipe(dest(foldersPath.dist.script));
}

function runTests() {
  const mocha = require('gulp-mocha');

  return src(filesPath.tests, { read: false })
      .pipe(mocha(config.mocha));
}

function beautifyPagesCode() {
  const beautify = require('gulp-beautify');

  return src(filesPath.dist.pages)
      .pipe(beautify.html(config.codeStyle))
      .pipe(dest(foldersPath.dist.pages));
}

function copyStaticFiles() {
  return src([filesPath.asserts, filesPath.ignore.md])
      .pipe(dest(foldersPath.dist.folder));
}

function deleteDistFolder() {
  return require('del')(foldersPath.dist.folder);
}

function runFileWatcher() {
  watch(filesPath.pages, series(buildPages, beautifyPagesCode));
  watch(filesPath.styles, series(buildStyles));
  watch([filesPath.scripts, filesPath.ignore.test], series(buildScripts));
  watch(filesPath.asserts, copyStaticFiles);
}

function runLocalServer() {
  require('browser-sync').create().init({
    watch: true,
    watchOptions: { ignoreInitial: true, ignored: ['*.log', '*.md'] },
    server: { index: ROOT, directory: true, baseDir: foldersPath.dist.folder },
  });

  runFileWatcher();
}

exports.ts = buildScripts;
exports.html = buildPages;
exports.scss = buildStyles;
exports.copy = copyStaticFiles;

exports.server = runLocalServer;
exports.watch = runFileWatcher;
exports.test = runTests;

exports.build = series(
    deleteDistFolder, parallel(
        series(buildPages, beautifyPagesCode),
        series(buildStyles),
        series(buildScripts),
        copyStaticFiles,
    ),
);
