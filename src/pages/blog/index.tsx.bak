import { StaticQuery, graphql } from 'gatsby';
import {
  ContentfulRichTextGatsbyReference, RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import BlogPost from '@components/BlogPost';
import { DefaultView } from '@views';

interface BlogPost {
  node: {
    body: RenderRichTextData<ContentfulRichTextGatsbyReference>;
    date: string;
    id: string;
    title: string;
  }
}

interface PageProps {
  location: Location;
}

const BLOG_POSTS = graphql`
  query {
    blogs: allContentfulBlogPost(sort: {order: DESC, fields: date}) {
      edges {
        node {
          ...BlogPost
        }
      }
    }
  }
`;

const BlogPage = ({ location: { pathname } }: PageProps) => (
  <StaticQuery
    query={BLOG_POSTS}
    render={({ blogs: { edges } }) => (
      <DefaultView mainClass="blog" noHeightContraint path={pathname}>
        <Container>
          <Row>
            <Col md={2} />
            <Col>
              {edges.map(({ node: { body, date, id, title } }: BlogPost) => (
                <BlogPost body={body} date={date} id={id} title={title} />
              ))}
            </Col>
            <Col md={2} />
          </Row>
        </Container>
      </DefaultView>
    )}
  />
);

export default BlogPage;
