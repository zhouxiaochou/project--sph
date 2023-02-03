module.exports = {
  root: true,
  "env": {
    "browser": true,
    "es6": true,
    node: true
  },
  "extends": ["plugin:vue/essential",
    'eslint:recommended'],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    parser: '@babel/eslint-parser'
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "generator-star-spacing": "off",
    "no-tabs": "off",
    "no-unused-vars": "off",
    "no-console": "off",
    "no-irregular-whitespace": "off",
    "no-debugger": "off",
    "vue/multi-word-component-names": "off",
  }
};
