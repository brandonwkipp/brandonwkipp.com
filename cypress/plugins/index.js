/* eslint no-param-reassign: 0 */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { generateEndpoints } = require('gatsby-cypress-endpoints');

module.exports = (on, config) => {
  if (config.env.environment !== 'live') generateEndpoints(on, config);

  // Grab the CONTENTFUL_ENVIRONMENT value unless it is undefined, then default to master
  config.env.CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  return config;
};
