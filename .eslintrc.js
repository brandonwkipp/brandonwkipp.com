module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    'cypress/globals': true,
  },
  plugins: [
    'cypress',
  ],
  rules: {
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
