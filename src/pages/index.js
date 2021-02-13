import PropTypes from 'prop-types';
import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Landing from '@components/Landing';
import Layout from '@components/Layout';

const IndexPage = ({ location }) => (
  <Layout bg="bg-landing">
    <Header location={location} />
    <Landing />
    <Footer />
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default IndexPage;
