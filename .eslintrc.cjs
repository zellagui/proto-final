module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
    'prettier',
  ],
  plugins: ['frontmatter', '@typescript-eslint', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
  },
  overrides: [
    {
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
      extends: ['plugin:prettier/recommended', 'plugin:md/recommended'],
      rules: {
        'prettier/prettier': ['error', { parser: 'markdown' }],
      },
    },
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
      ],
      rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/script-setup-uses-vars': 'error',
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': 'off',
        'guard-for-in': 'error',
        '@typescript-eslint/no-unused-vars': ['error'],
      },
    },
    {
      files: ['*.vue'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:vue/vue3-recommended',
        'plugin:vuejs-accessibility/recommended',
      ],
      rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/script-setup-uses-vars': 'error',
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': 'off',
        'guard-for-in': 'error',
        '@typescript-eslint/no-unused-vars': ['error'],

        'vuejs-accessibility/form-control-has-label': 'off',
        'vuejs-accessibility/label-has-for': 'off',
        'vuejs-accessibility/anchor-has-content': 'off',

        // not required since vue 3.3.0
        'vue/no-setup-props-destructure': 'off',
      },
    },
  ],
}
