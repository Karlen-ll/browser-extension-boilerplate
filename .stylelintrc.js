/**
 * Stylelint config
 * @see https://stylelint.io/
 * @see https://stylelint.io/user-guide/example-config */
module.exports = {
  extends: ['stylelint-config-recommended-scss'],

  plugins: ['stylelint-scss'],

  rules: {
    // SCSS rules
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/double-slash-comment-whitespace-inside': 'always',

    // Base Stylelint rules
    'unit-case': 'lower',
    'property-case': 'lower',
    'color-hex-case': 'lower',
    'length-zero-no-unit': true,
    'at-rule-name-case': 'lower',
    'function-name-case': 'lower',
    'value-keyword-case': 'lower',
    'selector-type-case': 'lower',
    'number-leading-zero': 'always',
    'declaration-no-important': true,
    'number-no-trailing-zeros': true,
    'media-feature-name-case': 'lower',
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-element-case': 'lower',
    'selector-combinator-space-after': 'always',
    'selector-descendant-combinator-no-non-space': true,

    'rule-empty-line-before': [
      'always-multi-line',
      { except: ['after-single-line-comment', 'first-nested'] },
    ],

    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep'] },
    ],
  },
};
