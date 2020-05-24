  module.exports = {
  'extends': 'airbnb',
  'env': {
    'browser': true
  },
  'rules': {
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.js',
          '.jsx'
        ]
      }
    ]
  },
  'settings': {
    'import/resolver': {
      'alias': [
        ['@components', './src/components'],
        ['@content', './src/content'],
      ]
    }
  }
};
