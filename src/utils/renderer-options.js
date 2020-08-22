import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

// Options object to pass into documentToReactComponents
const rendererOptions = {
  // Ensure line breaks are converted to html.
  renderText: (text1) => text1.split('\n').flatMap((text2, i) => [i > 0 && <br />, text2]),
  renderNode: {
    // Render embedded images from richText fields
    [INLINES.HYPERLINK]: (node) => {
      if (node.data.uri.indexOf('youtube.com') !== -1) {
        return (
          <span className="d-table iframe-container mb-0">
            <iframe
              allowFullScreen
              className="mb-0"
              frameBorder="0"
              height="315"
              src={`${node.data.uri}?cc_load_policy=1`}
              title="YouTube Video"
              width="560"
            />
          </span>
        );
      }

      return (
        <a href={node.data.uri}>{node.content[0].value}</a>
      );
    },
    // Render embedded images from richText fields
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { data: { target } } = node;

      const { caption, media } = target.fields;
      const alt = media['en-US'].fields.title['en-US'];
      const { url } = media['en-US'].fields.file['en-US'];

      return (
        <Container className="text-center" fluid>
          <Row>
            <Col>
              <img alt className="w-100" src={url} />
            </Col>
          </Row>
          <Row>
            <Col>{caption['en-US']}</Col>
          </Row>
        </Container>
      );
    },
  },
};

export default rendererOptions;
