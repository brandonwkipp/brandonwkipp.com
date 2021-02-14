import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import Page from '@components/Page';

export const PAGE_QUERY = graphql`
  query($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      body {
        raw
        references {
          ...ProfilePhoto
        }
      }
    }
  }
`;

export default function PageTemplate({ data, location }) {
  const { page } = data;

  return (
    <Layout bg="bg-resume">
      <Header location={location} />
      <Page data={page} />
      <Footer />
    </Layout>
  );
}

PageTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
