require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const excludedPages = ['/the-list/', '/time/'];

module.exports = {
  siteMetadata: {
    title: 'Brandon W. Kipp',
    description: 'Kick off your next, great Gatsby project with this default starter.',
    author: 'Brandon W. Kipp',
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-exclude',
      options: { paths: excludedPages },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/puzzle.png',
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: `@import "${__dirname}/src/styles/variables";`,
        includePaths: [
          'src/components',
        ],
      },
    },
  ],
};
