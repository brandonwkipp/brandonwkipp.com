import { graphql } from 'gatsby';
import {
  ContentfulRichTextGatsbyReference, RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import Page from '@components/Page';

interface PageTemplateProps {
  data: {
    page: {
      body: RenderRichTextData<ContentfulRichTextGatsbyReference>;
    };
  }
  location: {
    pathname: string;
  }
}

export const PAGE_QUERY = graphql`
  query($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      body {
        raw
        references {
          ...ProfilePhoto
        }
      }
    }
  }
`;

const PageTemplate = ({ data: { page }, location }: PageTemplateProps) => (
  <Layout bg="bg-resume">
    <Header location={location} />
    <Page data={page} />
    <Footer />
  </Layout>
);

export default PageTemplate;
