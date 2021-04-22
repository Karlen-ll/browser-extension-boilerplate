/**
 * Eslint rules
 * @see https://eslint.org/docs/rules/ */
module.exports = {
  root: true,

  env: {
    'browser': true,
    'es2021': true,
  },

  globals: {
    chrome: 'readonly',
    // jQuery
    $: 'readonly',
    jQuery: 'readonly',
    // Tests
    it: 'readonly',
    expect: 'readonly',
    describe: 'readonly',
  },

  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },

  extends: ['google'],

  plugins: ['import'],

  rules: {
    'import/first': 2,
    'import/order': 2,
    'import/default': 2,
    'import/no-cycle': 2,
    'import/exports-last': 0,
    'import/no-duplicates': 2,
    'import/no-deprecated': 2,
    'import/no-self-import': 2,
    'import/no-absolute-path': 2,
    'import/no-mutable-exports': 2,
    'import/newline-after-import': 2,
    'import/no-webpack-loader-syntax': 2,
    'import/no-useless-path-segments': 2,
    'import/no-relative-parent-imports': 2,
    'import/max-dependencies': [2, {max: 15}],
    'import/no-extraneous-dependencies': [2, {
      optionalDependencies: false,
      peerDependencies: false,
      devDependencies: true,
    }],

    /** Configuration */

    'one-var': 'off',
    'no-invalid-this': 'off',
    'eqeqeq': ['error', 'always'],

    'max-len': ['error', { 'code': 120 }],

    'valid-jsdoc': ['off', {
      'prefer': {
        'arg': 'param',
          'argument': 'param',
          'class': 'constructor',
          'return': 'returns',
          'virtual': 'abstract'
      }
    }],
  },
};
