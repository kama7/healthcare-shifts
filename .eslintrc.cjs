
module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: [ '.vue' ]
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.
    'prettier'
  ],

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',

    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
    // required to lint *.vue files
    'vue'

    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Prettier has not been included as plugin to avoid performance impact
    // add it as an extension for your IDE

  ],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly',
  },

  // add your custom rules here
  rules: {

    'no-nested-ternary': 'off',
    'prefer-promise-reject-errors': 'off',
    "vue/html-indent": ["error", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/html-comment-indent': 'error',
    'vue/html-comment-content-newline': 'error',
    'vue/html-comment-content-spacing': 'error',
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/new-line-between-multi-line-property': 'error',
    'vue/no-empty-component-block': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/dot-notation': 'error',
    'vue/key-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/define-macros-order': ['error', {
      'order': ['defineOptions', 'defineSlots', 'defineProps', 'defineEmits'],
    }],
    'vue/block-order': ['error', {
      'order': [['script', 'template'], 'style'],
    }],
    'vue/object-shorthand': 'error',
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/padding-line-between-tags': ['error', [
      { 'blankLine': 'always', 'prev': '*', 'next': '*' },
      { 'blankLine': 'never', 'prev': 'li', 'next': 'li' },
    ]],
    'vue/block-tag-newline': ['error', {
      'singleline': 'always',
    }],
    'vue/no-static-inline-styles': 'error',
    'vue/no-required-prop-with-default': 'error',
    'vue/no-root-v-if': 'error',
    'vue/prefer-define-options': 'error',
    'vue/valid-define-options': 'error',
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/require-macro-variable-name': 'error',
    'vue/require-typed-ref': 'error',
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 1
      },
      "multiline": {
        "max": 1
      }
    }],


    quotes: ['warn', 'single', { avoidEscape: true }],

    'object-curly-spacing': ["error", "always"],

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
      { blankLine: 'always', prev: '*', next: 'return' },
      // Sequence of variable declarations
      { blankLine: 'always', prev: '*', next: ['const', 'let'] },
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
    ],
    curly: ['error', 'all'],
    'max-lines': ['error', {
      max: 500,
      skipComments: true,
      skipBlankLines: true,
    }],
    "no-multiple-empty-lines":  ["error", { "max": 1, "maxEOF": 0 }],
    "no-trailing-spaces": "error",
    // this rule, if on, would require explicit return type on the `render` function
    '@typescript-eslint/explicit-function-return-type': 'off',

    // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
    '@typescript-eslint/no-var-requires': 'off',

    // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
    // does not work with type definitions
    'no-unused-vars': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
