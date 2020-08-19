/* eslint no-console: 0 */
/* eslint import/no-unresolved: 0 */
import depcheck from 'depcheck';
import chalk from 'chalk';
import _ from 'lodash';
import path from 'path';

const options = {
  // These packages are used, but don't show up in depcheck's usage check.
  // Manually exclude them from checking.
  ignoreMatches: [
    //
    // Gatsby plugins
    // Some of our Gatsby plugins that are used in the gatsby-config.js file are automatically
    // whitelisted using the gatsby specials entry below. However, plugins that use the resolve
    // pattern can't be whitelisted by this package. Open issue here:
    // https://github.com/depcheck/depcheck/issues/525
    // For those, we manually whitelist them here.
    //
    // Google Analytics tracking
    'gatsby-plugin-google-analytics',
    'gatsby-plugin-google-tagmanager',
    // Plugins for browser functionality
    'gatsby-plugin-manifest',
    'gatsby-plugin-react-helmet',
    // Display helpers
    'gatsby-plugin-react-svg',
    'gatsby-plugin-sass',
    // Gatsby data source for image processing
    'gatsby-source-graphql',
    // Gatsby data source for Contentful CMS
    'gatsby-source-contentful',
    //
    // Dev dependencies
    //
    // Gatsby build tools
    // You won't find node-sass in the project, but without it Gatsby will error on build.
    'node-sass',
    // Lint tools
    'eslint',
    'eslint-config-airbnb',
    'eslint-import-resolver-alias',
    'eslint-loader',
    'eslint-plugin-cypress',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'stylelint',
    'stylelint-config-standard',
    'stylelint-order',
    // Test frameworks
    'cypress',
    'start-server-and-test',
    // Node script tools
    'npm-run-all',
    'sort-package-json',
    '@babel/register',
  ],
  // skip calculation of missing dependencies
  skipMissing: true,
  ignoreDirs: [
    'public',
  ],
  // the target special parsers
  specials: [
    depcheck.special.babel,
    depcheck.special.eslint,
    depcheck.special.gatsby,
    depcheck.special.webpack,
  ],
};

depcheck(path.join(__dirname, '..'), options, (unused) => {
  const unusedDependencies = _.get(unused, 'dependencies', null);
  const unusedDevDependencies = _.get(unused, 'devDependencies', null);
  if (!_.isEmpty(unusedDependencies)) {
    console.log(chalk.yellow.bold('Unused dependencies'));
    console.log(chalk.yellow(_.join(unusedDependencies, '\n')));
  }
  if (!_.isEmpty(unusedDevDependencies)) {
    console.log(chalk.yellow.bold('Unused devDependencies'));
    console.log(chalk.yellow(_.join(unusedDevDependencies, '\n')));
  }
});
