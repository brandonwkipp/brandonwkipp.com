// const fs = require('fs');
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@content': path.resolve(__dirname, './src/content'),
      },
    },
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const { data: { blogs } } = await graphql(`
    {
      blogs: allContentfulBlogPost {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `);

  if (blogs.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  // Blog posts
  blogs.edges.forEach(({ node }) => {
    createPage({
      component: path.resolve('./src/templates/Blog/index.js'),
      context: {
        slug: node.slug,
      },
      path: `/blogs/${node.slug}`,
    });
  });

  // // Generate cypress text fixture for Blog pages
  // fs.writeFile(
  //   `${__dirname}/cypress/fixtures/dynamic-pages/blog-pages.json`,
  //   JSON.stringify(blogs.edges),
  //   (err) => {
  //     if (err) console.error(err);
  //     else console.log('Blog page cypress fixtures have been created.');
  //   },
  // );
};
