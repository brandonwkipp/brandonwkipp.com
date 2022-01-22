module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:react/recommended',
  ],
  ignorePatterns: [
    'public/*',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jest',
    'react-hooks',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // We need this to accomodate internal field names from Contentful
    '@typescript-eslint/naming-convention': [
      1,
      {
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-var-requires': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'linebreak-style': ['error', 'unix'],
    'no-use-before-define': 0,
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@components', './src/components'],
        ['@mocks', './src/__mocks__'],
        ['@utils', './src/utils'],
        ['@views', './src/views'],
      ],
    },
    // Tells eslint-plugin-react to automatically detect the version of React to use
    react: {
      version: 'detect',
    },
  },
};
