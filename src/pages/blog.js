import PropTypes from 'prop-types';
import React from 'react';

import Blog from '@components/Blog';
import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';

const BlogPage = ({ location }) => (
  <Layout>
    <Header location={location} />
    <Blog />
    <Footer />
  </Layout>
);

BlogPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogPage;
