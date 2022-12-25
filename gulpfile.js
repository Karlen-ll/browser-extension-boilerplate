'use strict';

const {dest, src, watch, series, parallel} = require('gulp');
const mode = require('gulp-mode')({
  modes: ['production', 'development'],
  default: 'development',
  verbose: false,
});

const {options, folder, pages, files} = require('./project-config.js');

function buildHtml() {
  const include = require('posthtml-include');
  const replace = require('buffer-replace');
  const postHTML = require('gulp-posthtml');
  const tap = require('gulp-tap');

  return src([files.pages, files.ignore.html])
      .pipe(postHTML([include({encoding: 'utf8', root: folder.pages})]))
      .pipe(mode.development(tap((file) => {
        if (pages[file.stem]) {
          const mark = '</head>';
          const style = pages[file.stem].style;

          if (style) {
            // Add development <style> to content
            file.contents = replace(Buffer.from(file.contents), mark, `${ style }\n${ mark }`);
          }
        }
      })))
      .pipe(dest(folder.dist.pages));
}

function buildScss() {
  const autoprefixer = require('autoprefixer');
  const sourceMap = require('gulp-sourcemaps');
  const minCSS = require('gulp-clean-css');
  const postCSS = require('gulp-postcss');
  const sass = require('gulp-sass')(require('sass'));

  return src(files.style)
      .pipe(mode.development(sourceMap.init()))
      .pipe(sass({syntax: 'scss', outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(postCSS([autoprefixer()]))
      .pipe(mode.development(sourceMap.write('./')))
      .pipe(mode.production(minCSS()))
      .pipe(dest(folder.dist.style));
}

function buildScripts() {
  const uglify = require('gulp-uglify');
  const babel = require('gulp-babel');

  return src([files.script, files.ignore.test])
      .pipe(babel(options.babel))
      .pipe(mode.production(uglify()))
      .pipe(dest(folder.dist.script));
}

function test() {
  const mocha = require('gulp-mocha');

  return src(files.test, {read: false})
      .pipe(mocha(options.mocha));
}

function beautifyHtml() {
  const beautify = require('gulp-beautify');

  return src(files.dist.pages)
      .pipe(beautify.html(options.codeStyle))
      .pipe(dest(folder.dist.pages));
}

function copyFiles() {
  return src([files.assert, files.ignore.md])
      .pipe(dest(folder.dist.folder));
}

function deleteDist() {
  return require('del')(folder.dist.folder);
}

function runWatcher() {
  watch(folder.pages + '**/*.html', series(buildHtml, beautifyHtml));
  watch(folder.style + '**/*.scss', series(buildScss));
  watch([folder.script + '**/*.ts', `!${ folder.script }**/*.test.ts`], series(buildScripts));
  watch(folder.assert + '**/*.*', copyFiles);
}

function runLocalServer() {
  const broSync = require('browser-sync').create();
  broSync.init({
    watch: true,
    watchOptions: {
      ignoreInitial: true,
      ignored: ['*.log', '*.md'],
    },
    server: {
      index: './',
      baseDir: folder.dist.folder,
      directory: true,
    },
  });
  runWatcher();
}

exports.html = buildHtml;
exports.scss = buildScss;
exports.js = buildScripts;
exports.copy = copyFiles;

exports.server = runLocalServer;
exports.watch = runWatcher;
exports.test = test;

exports.build = series(
    deleteDist, parallel(
        series(buildHtml, beautifyHtml),
        series(buildScss),
        series(buildScripts),
        copyFiles,
    ),
);
