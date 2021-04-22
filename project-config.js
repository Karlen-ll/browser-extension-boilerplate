const
  options = {
    src:    './src/',     // Source folder
    dist:   './dist/',    // Distribution folder
    assert: './static/',  // Folder with static files

    /**
     * HTML code style */
    codeStyle: {
      indent_char: '	',
      indent_size: 1,
      editorconfig: false,
      preserve_newlines: false
      /** More code style options
       * @see https://github.com/beautify-web/js-beautify */
    },

    /**
     * Babel options */
    babel: {
      presets: [["@babel/preset-env", {
        "modules": false,
        "targets": "> 1%, last 2 versions, Firefox ESR, not ie <= 11, not dead"
        /** More options @see https://github.com/browserslist/browserslist */
      }]]
    },

    /**
     * Mocha options */
    mocha: {
      /** More reporter
       * @see https://github.com/mochajs/mocha/tree/master/lib/reporters */
      reporter: 'list',
      exit: false
    }
  },

  /**
   * Extension pages */
  pages = {
    popup: {
      /** Development page style */
      style: '<style>html{display:flex;background-color:#131418;min-height:100vh;justify-content:center;' +
        'align-items:center;overflow-x:hidden}body{width: min-content;outline:1px solid #000;' +
        'background-color:#fff;overflow:hidden;margin:0}</style>'
    },
  },

  /**
   * Project directories */
  folder = {
    pages:  options.src + 'pages/',
    script: options.src + 'script/',
    style:  options.src + 'style/',
    assert: options.assert,

    dist: {
      folder: options.dist,
      pages:  options.dist + '',
      style:  options.dist + 'css/',
      script: options.dist + '',
      images: options.dist + options.images,
    }
  },

  /**
   * Path to project files */
  files = {
    pages:  folder.pages  + '**/*.html',
    style:  folder.style  + '*.scss',
    script: folder.script + '**/*.js',
    test:   folder.script + '**/*.test.js',
    assert: folder.assert + '**/*',
    images: folder.images + '**/*',

    dist: {
      pages:  folder.dist.pages  + '*.html',
      style:  folder.dist.style  + '*.css',
      script: folder.dist.script + '**/*.js',
      images: folder.dist.images + '**/*',
    },

    ignore: {
      script: '!' + folder.script + '_**/*',
      test:   '!' + folder.script + '**/*.test.js',
      html:   '!' + folder.pages  + '_**/*',
      md:     '!' + folder.assert + '**/*.md'
    },
  };

module.exports = {
  options,
  folder,
  pages,
  files
};
