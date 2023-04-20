module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'space-before-function-paren': 0
  },
  ignorePatterns: ['**/node_modules/**'] // THIS WORKS!
}
