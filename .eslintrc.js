module.exports = {
  extends: [
    'airbnb',
    'plugin:jsx-a11y/strict',
  ],
  env: {
    browser: true,
    'cypress/globals': true,
  },
  ignorePatterns: [
    'public/*',
  ],
  plugins: [
    'cypress',
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@components', './src/components'],
        ['@utils', './src/utils'],
      ],
    },
  },
};
