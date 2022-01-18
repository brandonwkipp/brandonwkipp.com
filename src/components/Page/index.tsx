import {
  ContentfulRichTextGatsbyReference, RenderRichTextData, renderRichText,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import rendererOptions from '@utils/renderer-options';

import './index.scss';

interface PageProps {
  data: {
    body: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  }
}

const Page = ({ data: { body } }: PageProps) => (
  <main className="page">
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
  </main>
);

export default Page;
