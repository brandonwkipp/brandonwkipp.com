import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import {
  Card, CardBody, CardTitle, Col, Container, Row,
} from 'reactstrap';

import rendererOptions from '@utils/renderer-options';

import './index.scss';

const BLOG_POSTS = graphql`
  query {
    allContentfulBlogPost(sort: {order: DESC, fields: date}) {
      edges {
        node {
          body {
            json
          }
          date(formatString: "MMMM Do, YYYY")
          title
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
        {data.allContentfulBlogPost.edges.map((blog) => (
          <Card className="blog-post" key={blog.node.title}>
            <CardTitle className="text-center">
              <h2 className="mt-3">{blog.node.title}</h2>
              <h3>{blog.node.date}</h3>
            </CardTitle>
            <CardBody className="mb-1 mb-md-3 mx-auto">
              {documentToReactComponents(blog.node.body.json, rendererOptions)}
            </CardBody>
          </Card>
        ))}
      </>
    )}
  />
);

export default Blog;
