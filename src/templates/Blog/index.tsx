import { graphql } from 'gatsby';
import {
  ContentfulRichTextGatsbyReference, RenderRichTextData, renderRichText,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import rendererOptions from '@utils/renderer-options';

import '@components/Blog/index.scss';

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

const BlogTemplate = ({ data, location }: BlogTemplateProps) => {
  const { blog } = data;
  const { body, date, title } = blog;

  return (
    <Layout bg="bg-resume">
      <Header location={location} />
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
      <Footer />
    </Layout>
  );
};

export default BlogTemplate;
