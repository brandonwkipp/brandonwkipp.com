/* eslint no-console: 0 */
/* eslint import/no-unresolved: 0 */
import depcheck from 'depcheck';
import chalk from 'chalk';
import _ from 'lodash';
import path from 'path';

const options = {
  ignoreMatches: [
    '@babel/register',
    '@fortawesome/free-brands-svg-icons',
    '@fortawesome/free-regular-svg-icons',
    'countdown',
    'cypress',
    'cypress-axe',
    'eslint-loader',
    'gatsby-plugin-eslint',
    'gatsby-plugin-exclude',
    'gatsby-plugin-manifest',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    'gatsby-plugin-typography',
    'html-loader',
    'husky',
    'markdown-loader',
    'node-sass',
    'npm-run-all',
    'react-typography',
    'sort-package-json',
    'stylelint',
    'stylelint-config-standard',
    'stylelint-config-order',
    'stylelint-order',
  ],
  skipMissing: true,
  ignoreDirs: [
    'public',
  ],
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
