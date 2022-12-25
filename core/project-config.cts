const config = {
  path: {
    src: './src/',
    dist: './dist/',
    assert: './static/',
  },

  /** Babel options.
   * {@link https://github.com/browserslist/browserslist BrowsersList options} */
  babel: {
    presets: [['@babel/preset-typescript', {
      'modules': false,
      'targets': '> 1%, last 2 versions, Firefox ESR, not ie <= 11, not dead',
    }]],
  },

  /** {@link https://github.com/posthtml/gulp-posthtml#options postHTML options} */
  postHTML: {
    encoding: 'utf8',
  },

  /** {@link https://sass-lang.com/documentation/js-api/interfaces/LegacySharedOptions Sass options} */
  scss: {
    syntax: 'scss',
    outputStyle: 'compressed',
  },

  /** {@link https://github.com/gulp-sourcemaps/gulp-sourcemaps#init-options Sourcemaps options} */
  sourcemaps: {},
  writeSourcemaps: { addComment: false },

  /** {@link https://github.com/postcss/postcss#options PostCSS options} */
  postCSS: {},

  /** Mocha options.
   * {@link https://github.com/mochajs/mocha/tree/master/lib/reporters More reporter} */
  mocha: {
    reporter: 'list',
    exit: false,
  },

  /** {@link https://github.com/beautify-web/js-beautify HTML code style options} */
  codeStyle: {
    // eslint-disable-next-line no-tabs
    indent_char: '	',
    indent_size: 1,
    editorconfig: false,
    preserve_newlines: false,
  },
};

const foldersPath = {
  pages: config.path.src + 'pages/',
  script: config.path.src + 'script/',
  style: config.path.src + 'style/',
  assert: config.path.assert,

  dist: {
    folder: config.path.dist,
    pages: config.path.dist + '',
    style: config.path.dist + 'css/',
    script: config.path.dist + '',
  },
};

const filesPath = {
  pages: foldersPath.pages + '**/*.html',
  rootStyles: foldersPath.style + '*.scss',
  styles: foldersPath.style + '**/*.scss',
  scripts: foldersPath.script + '**/*.ts',
  tests: foldersPath.script + '**/*.test.ts',
  asserts: foldersPath.assert + '**/*',

  dist: {
    pages: foldersPath.dist.pages + '*.html',
    styles: foldersPath.dist.style + '*.css',
    scripts: foldersPath.dist.script + '**/*.js',
  },

  ignore: {
    test: '!' + foldersPath.script + '**/*.test.ts',
    html: '!' + foldersPath.pages + '_**/*',
    md: '!' + foldersPath.assert + '**/*.md',
  },
};

module.exports = {
  config,
  filesPath,
  foldersPath,
};
