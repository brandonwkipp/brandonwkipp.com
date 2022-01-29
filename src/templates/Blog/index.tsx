import { graphql } from 'gatsby';
import {
  ContentfulRichTextGatsbyReference, RenderRichTextData, renderRichText,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';

import DefaultView from '@views/DefaultView';
import rendererOptions from '@utils/renderer-options';

import '@components/BlogPost/index.scss';

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
      title: string;
    };
  }
  location: {
    pathname: string;
  }
}

const BlogTemplate = ({ data, location: { pathname } }: BlogTemplateProps) => {
  const { blog } = data;
  const { body, date, title } = blog;

  return (
    <DefaultView path={pathname}>
      <main className="blog">
        <Container>
          <Row>
            <Col md={2} />
            <Col>
              <Card>
                <h2 className="mt-3">{title}</h2>
                <p>{date}</p>
                <div className="mb-3 mx-auto w-75">
                  {renderRichText(body, rendererOptions)}
                </div>
              </Card>
            </Col>
            <Col md={2} />
          </Row>
        </Container>
      </main>
    </DefaultView>
  );
};

export default BlogTemplate;
