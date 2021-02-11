const fs = require('fs');
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
      },
    },
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const createFromTemplate = (entries, prefix, template, type) => {
    entries.forEach(({ node }) => {
      if (node.slug) {
        createPage({
          component: path.resolve(template),
          context: {
            slug: node.slug,
          },
          path: `${prefix}/${node.slug}`,
        });

        // Generate cypress text fixture for Blog pages
        fs.writeFile(
          `${__dirname}/cypress/fixtures/dynamic-pages/${type}.json`,
          JSON.stringify(entries),
          (err) => {
            if (err) console.error(err);
            else console.log(`${type} cypress fixtures have been created.`);
          },
        );
      }
    });
  };

  const { data: { blogs, pages } } = await graphql(`
    {
      blogs: allContentfulBlogPost {
        edges {
          node {
            slug
            title
          }
        }
      }

      pages: allContentfulPage {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  // Blog posts
  createFromTemplate(
    blogs.edges,
    '/blog',
    './src/templates/Blog/index.js',
    'blogPost',
  );

  // Pages
  createFromTemplate(
    pages.edges,
    '',
    './src/templates/Page/index.js',
    'page',
  );
};
