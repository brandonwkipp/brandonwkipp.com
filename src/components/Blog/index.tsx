import { StaticQuery, graphql } from 'gatsby';
import {
  ContentfulRichTextGatsbyReference, RenderRichTextData, renderRichText,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import {
  Card, CardBody, CardTitle, Col, Container, Row,
} from 'reactstrap';

import rendererOptions from '@utils/renderer-options';

import './index.scss';

const BLOG_POSTS = graphql`
  query {
    blogs: allContentfulBlogPost(sort: {order: DESC, fields: date}) {
      edges {
        node {
          body {
            raw
            references {
              ...BlogMediaAsset
            }
          }
          date(formatString: "MMMM Do, YYYY")
          id
          title
        }
      }
    }
  }
`;

interface BlogPost {
  node: {
    body: RenderRichTextData<ContentfulRichTextGatsbyReference>;
    date: string;
    id: string;
    title: string;
  }
}

const Blog = () => (
  <StaticQuery
    query={BLOG_POSTS}
    render={({ blogs: { edges } }) => (
      <main className="blog">
        <Container>
          <Row>
            <Col md={2} />
            <Col>
              {edges.map(({ node: { body, date, id, title } }: BlogPost) => (
                <Card key={id}>
                  <CardTitle className="text-center">
                    <h2 className="mt-3">{title}</h2>
                    <h3>{date}</h3>
                  </CardTitle>
                  <CardBody className="mb-1 mb-md-3 mx-auto px-0">
                    {renderRichText(body, rendererOptions)}
                  </CardBody>
                </Card>
              ))}
            </Col>
            <Col md={2} />
          </Row>
        </Container>
      </main>
    )}
  />
);

export default Blog;
