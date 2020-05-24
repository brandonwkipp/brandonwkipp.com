import { StaticQuery, graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import { Card } from 'reactstrap';

import './index.scss';

const BLOG_POSTS = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blog" }} },
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            title
          }
          html
        }
      }
    }
  }
`;

const Blog = () => (
  <StaticQuery
    query={BLOG_POSTS}
    render={(data) => (
      <>
        {data.allMarkdownRemark.edges.map((post) => (
          <Card className="blog-post border-0 rounded-0">
            <h1 className="mt-3 text-center">{post.node.frontmatter.title}</h1>
            <h5 className="text-center">{post.node.frontmatter.date}</h5>
            <div className="mb-3 mx-auto w-75">
              <Markdown>{post.node.html}</Markdown>
            </div>
          </Card>
        ))}
      </>
    )}
  />
);

export default Blog;
