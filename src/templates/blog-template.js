import React from 'react';
import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import { Card } from 'reactstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';

import '../components/Blog/index.css';

export const PAGE_QUERY = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
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
      <div id="blog-container">
        <Card className="post">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Card>
      </div>
      <Footer />
    </Layout>
  );
}

Template.propTypes = {
  data: propTypes.objectOf(propTypes.object).isRequired,
};
