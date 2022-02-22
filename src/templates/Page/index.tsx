import { graphql } from 'gatsby';
import {
  ContentfulRichTextGatsbyReference, RenderRichTextData, renderRichText,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import rendererOptions from '@utils/renderer-options';
import DefaultView from '@views/DefaultView';

import './index.scss';

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

const PageTemplate = ({ data: { page: { body } }, location: { pathname } }: PageTemplateProps) => (
  <DefaultView mainClass="page" noHeightContraint path={pathname}>
    <Container className="py-3">
      <Row>
        <Col md={2} />
        <Col>
          <div className="body mx-auto">
            {renderRichText(body, rendererOptions)}
          </div>
        </Col>
        <Col md={2} />
      </Row>
    </Container>
  </DefaultView >
);

export default PageTemplate;
