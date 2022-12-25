const options = {
  src: './src/',
  dist: './dist/',
  assert: './static/',

  /** Babel options.
   * {@link https://github.com/browserslist/browserslist BrowsersList options} */
  babel: {
    presets: [['@babel/preset-typescript', {
      'modules': false,
      'targets': '> 1%, last 2 versions, Firefox ESR, not ie <= 11, not dead',
    }]],
  },

  /** Mocha options.
   * {@link https://github.com/mochajs/mocha/tree/master/lib/reporters More reporter} */
  mocha: {
    reporter: 'list',
    exit: false,
  },

  /** HTML code style.
   * {@link https://github.com/beautify-web/js-beautify More options} */
  codeStyle: {
    // eslint-disable-next-line no-tabs
    indent_char: '	',
    indent_size: 1,
    editorconfig: false,
    preserve_newlines: false,
  },
};

/** Extension pages */
const pages = {
  popup: {
    /** @desc Development page style */
    style: '<style>html{display:flex;background-color:#131418;min-height:100vh;justify-content:center;' +
        'align-items:center;overflow-x:hidden}body{width: min-content;outline:1px solid #000;' +
        'background-color:#fff;overflow:hidden;margin:0}</style>',
  },
};

/** Project directories */
const folder = {
  pages: options.src + 'pages/',
  script: options.src + 'script/',
  style: options.src + 'style/',
  assert: options.assert,

  dist: {
    folder: options.dist,
    pages: options.dist + '',
    style: options.dist + 'css/',
    script: options.dist + '',
    images: options.dist + options.images,
  },
};

/** Path to project files */
const files = {
  pages: folder.pages + '**/*.html',
  style: folder.style + '*.scss',
  script: folder.script + '**/*.ts',
  test: folder.script + '**/*.test.ts',
  assert: folder.assert + '**/*',
  images: folder.images + '**/*',

  dist: {
    pages: folder.dist.pages + '*.html',
    style: folder.dist.style + '*.css',
    script: folder.dist.script + '**/*.js',
    images: folder.dist.images + '**/*',
  },

  ignore: {
    script: '!' + folder.script + '_**/*',
    test: '!' + folder.script + '**/*.test.ts',
    html: '!' + folder.pages + '_**/*',
    md: '!' + folder.assert + '**/*.md',
  },
};

module.exports = {
  options,
  folder,
  pages,
  files,
};
