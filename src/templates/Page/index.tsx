import { graphql } from 'gatsby';
import {
  ContentfulRichTextGatsbyReference, RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';

import Page from '@components/Page';
import DefaultView from '@views/DefaultView';

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

const PageTemplate = ({ data: { page }, location: { pathname } }: PageTemplateProps) => (
  <DefaultView path={pathname}>
    <Page data={page} />
  </DefaultView >
);

export default PageTemplate;
