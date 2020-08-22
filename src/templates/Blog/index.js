import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import React from 'react';
import { Card } from 'reactstrap';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';

import '@components/Blog/index.scss';

export const PAGE_QUERY = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug } ) {
      body {
        json
      }
      date(formatString: "MMMM Do, YYYY")
      title
    }
  }
`;

export default function Template({ data }) {
  const { contentfulBlogPost } = data;

  return (
    <Layout>
      <Header />
      <Card className="blog-post">
        <h2 className="mt-3">{contentfulBlogPost.title}</h2>
        <h3>{contentfulBlogPost.date}</h3>
        <div className="mb-3 mx-auto w-75">
          {documentToReactComponents(contentfulBlogPost.body.json)}
        </div>
      </Card>
      <Footer />
    </Layout>
  );
}

Template.propTypes = {
  data: propTypes.objectOf(propTypes.object).isRequired,
};
