const path = require('path');

exports.onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          loader: 'html-loader',
        },
        {
          test: /\.md$/,
          loader: 'markdown-loader',
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: false,
          },
        },
      ],
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
      },
    },
  });

  if (stage === 'develop' || stage === 'build-javascript') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
    );

    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }

    actions.replaceWebpackConfig(config);
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const createFromTemplate = (entries, prefix, template) => {
    entries.forEach(({ node }) => {
      if (node.slug) {
        createPage({
          component: path.resolve(template),
          context: {
            slug: node.slug,
          },
          path: `${prefix}/${node.slug}`,
        });
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

  // Create pages from templates
  createFromTemplate(blogs.edges, '/blog', './src/templates/Blog/index.js');
  createFromTemplate(pages.edges, '', './src/templates/Page/index.js');
};
