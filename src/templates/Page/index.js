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
      }
    }
  }
`;

export default function PageTemplate({ data }) {
  const { page } = data;

  return (
    <Layout bg="bg-landing">
      <Header />
      <Page data={page} />
      <Footer />
    </Layout>
  );
}

PageTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};
