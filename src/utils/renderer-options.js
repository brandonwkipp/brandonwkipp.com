import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const rendererOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { data: { target } } = node;

      if (target) {
        // eslint-disable-next-line
        const { contentful_id, fluid, __typename } = target;

        // eslint-disable-next-line
        return <GatsbyImage className={`${__typename}${contentful_id}`} image={getImage(node.data.target.gatsbyImageData)} />;
      }

      return null;
    },
    // Render embedded images from RichText fields
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { data: { target: { caption, media } } } = node;

      return (
        <Container className="text-center" fluid>
          <Row>
            <Col>
              <img
                alt={media.title}
                className="mb-0 w-100"
                src={media.file.url}
              />
            </Col>
          </Row>
          <Row>
            <Col>{caption}</Col>
          </Row>
        </Container>
      );
    },
    // Render embedded images within RichText fields
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
  },
  // Ensure line breaks are converted to html
  renderText: (text1) => text1.split('\n').flatMap((text2, i) => [i > 0 && <br />, text2]),
};

export default rendererOptions;
