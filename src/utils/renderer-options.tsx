/* eslint camelcase: 0 */
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const isMediaAnImage = (media: any) => (
  media?.file?.contentType === 'image/jpeg' || media?.file?.contentType === 'image/png'
);

const rendererOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { data: { target } } = node;

      if (target) {
        const { contentful_id, __typename } = target;

        if (isMediaAnImage(target)) {
          const image = getImage(target.gatsbyImageData);

          if (image) {
            return (
              <GatsbyImage
                alt={target.title}
                className={`${__typename}${contentful_id}`}
                image={image}
              />
            );
          }
        }
      }

      return null;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      const { data: { target: { caption, media } } } = node;

      if (isMediaAnImage(media)) {
        const image = getImage(media.gatsbyImageData);

        if (image) {
          return (
            <Container className="text-center" fluid>
              <Row>
                <Col>
                  <GatsbyImage alt={media.title} className="mb-0 w-100" image={image} />
                </Col>
              </Row>
              {caption && (
                <Row>
                  <Col>{caption}</Col>
                </Row>
              )}
            </Container>
          );
        }
      }

      return null;
    },
    // Render embedded images within RichText fields
    [INLINES.HYPERLINK]: (node: any) => {
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
  renderText: (text1: string) => text1.split('\n').flatMap((text2, i) => [i > 0 && <br />, text2]),
};

export default rendererOptions;
