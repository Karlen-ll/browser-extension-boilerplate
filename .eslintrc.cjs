module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  globals: {
    chrome: 'readonly',
    describe: 'readonly',
    expect: 'readonly',
    it: 'readonly',
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],

  rules: {
    '@typescript-eslint/no-var-requires': 0,
  },
}
