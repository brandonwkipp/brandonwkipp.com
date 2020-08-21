import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import {
  Card, Col, Container, Row,
} from 'reactstrap';

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
    render={(data) => {
      const options = {
        renderNode: {
          [BLOCKS.EMBEDDED_ENTRY]: (node) => {
            const { blockquote, file } = node.data.target.fields;
            const { title } = file['en-US'].fields.title['en-US'];
            const { url } = file['en-US'].fields.file['en-US'];

            return (
              <Container className="my-5" fluid>
                <Row>
                  <Col className="text-center">
                    <img alt={title} src={url} />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    {blockquote['en-US']}
                  </Col>
                </Row>
              </Container>
            );
          },
        },
      };

      return (
        <>
          {data.allContentfulBlogPost.edges.map((blog) => (
            <Card className="blog-post" key={blog.node.title}>
              <h2 className="mt-3 text-center">{blog.node.title}</h2>
              <h3 className="text-center">{blog.node.date}</h3>
              <div className="body mb-1 mb-md-3 mx-auto">
                {documentToReactComponents(blog.node.body.json, options)}
              </div>
            </Card>
          ))}
        </>
      );
    }}
  />
);

export default Blog;
