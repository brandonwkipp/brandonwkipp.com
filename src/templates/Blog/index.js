import { graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'reactstrap';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import rendererOptions from '@utils/renderer-options';

import '@components/Blog/index.scss';

export const PAGE_QUERY = graphql`
  query($slug: String!) {
    blog: contentfulBlogPost(slug: { eq: $slug } ) {
      body {
        raw
        references {
          ...BlogMediaAsset
        }
      }
      date(formatString: "MMMM Do, YYYY")
      title
    }
  }
`;

export default function Template({ data, location }) {
  const { blog } = data;
  const { body, date, title } = blog;

  return (
    <Layout>
      <Header location={location} />
      <Card>
        <h2 className="mt-3">{title}</h2>
        <h3>{date}</h3>
        <div className="mb-3 mx-auto w-75">
          {renderRichText(body, rendererOptions)}
        </div>
      </Card>
      <Footer />
    </Layout>
  );
}

Template.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
