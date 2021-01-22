module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'prettier',
    'prettier/vue',
  ],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'no-console': 0,
    'no-multi-spaces': ['error']
  },
}
