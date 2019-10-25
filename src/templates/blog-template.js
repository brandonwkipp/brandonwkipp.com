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
      <Card className="blog-post border-0 individual-blog-post rounded-0">
        <h1 className="mt-3 text-center">{frontmatter.title}</h1>
        <h6 className="text-center">{frontmatter.date}</h6>
        <div className="mb-3 mx-auto w-75">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Card>
      <Footer />
    </Layout>
  );
}

Template.propTypes = {
  data: propTypes.objectOf(propTypes.object).isRequired,
};
