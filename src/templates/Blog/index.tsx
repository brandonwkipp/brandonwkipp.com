import { graphql } from 'gatsby';
import {
  ContentfulRichTextGatsbyReference, RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import BlogPost from '@components/BlogPost';
import DefaultView from '@views/DefaultView';

export const PAGE_QUERY = graphql`
  query($slug: String!) {
    blog: contentfulBlogPost(slug: { eq: $slug } ) {
      ...BlogPost
    }
  }
`;

interface BlogTemplateProps {
  data: {
    blog: {
      body: RenderRichTextData<ContentfulRichTextGatsbyReference>;
      date: string;
      id: string;
      title: string;
    };
  }
  location: {
    pathname: string;
  }
}

const BlogTemplate = ({ data, location: { pathname } }: BlogTemplateProps) => {
  const { blog: { body, date, id, title } } = data;

  return (
    <DefaultView mainClass="blog" path={pathname}>
      <Container>
        <Row>
          <Col md={2} />
          <Col>
            <BlogPost body={body} date={date} id={id} title={title} />
          </Col>
          <Col md={2} />
        </Row>
      </Container>
    </DefaultView>
  );
};

export default BlogTemplate;
