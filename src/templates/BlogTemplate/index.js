import { graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';
import propTypes from 'prop-types';
import React from 'react';
import { Card } from 'reactstrap';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';

import '@components/Blog/index.scss';

export const PAGE_QUERY = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM Do, YYYY")
        path
        title
      }
    }
  }
`;

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <Header />
      <Card className="blog-post border-0 rounded-0">
        <h1 className="mt-3 text-center">{frontmatter.title}</h1>
        <h6 className="text-center">{frontmatter.date}</h6>
        <div className="mb-3 mx-auto w-75">
          <Markdown>{html}</Markdown>
        </div>
      </Card>
      <Footer />
    </Layout>
  );
}

Template.propTypes = {
  data: propTypes.objectOf(propTypes.object).isRequired,
};
