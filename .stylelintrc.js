module.exports = {
  extends: 'stylelint-config-standard',
  ignoreFiles: [
    'public/*.*css',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'order/order': [
      'custom-properties',
      'declarations',
    ],
    'order/properties-alphabetical-order': true,
    //
    // Don't lint value-keyword-case.
    //
    // This generates false positives on JS variables in the style block of a React component.
    // Ideally this linting rule could detect for this case, but it doesn't now.
    // The number of errors in CSS related to value-keyword-case are smaller than the
    // false-positives for the JS variable situation. We use JS variables in styles for dynamic
    // styles that can't be moved over into static classes.
    'value-keyword-case': null,
  },
};
