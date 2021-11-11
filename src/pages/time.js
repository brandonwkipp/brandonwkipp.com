import PropTypes from 'prop-types';
import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import TimeLeft from '@components/TimeLeft';

const TimeLeftPage = ({ location }) => (
  <>
    <Layout>
      <Header location={location} />
      <TimeLeft />
      <Footer />
    </Layout>
  </>
);

TimeLeftPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default TimeLeftPage;
