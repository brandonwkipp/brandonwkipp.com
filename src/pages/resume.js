import PropTypes from 'prop-types';
import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import Resume from '@components/Resume';

const ResumePage = ({ location }) => (
  <Layout bg="bg-resume">
    <Header location={location} />
    <Resume />
    <Footer />
  </Layout>
);

ResumePage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResumePage;
