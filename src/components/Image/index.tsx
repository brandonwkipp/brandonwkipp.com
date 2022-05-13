import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

interface ImageProps {
  alt: string;
  caption?: string;
  className?: string;
  data: IGatsbyImageData;
  imageBreak?: boolean;
}

const Image = ({ alt, caption, className, data, imageBreak }: ImageProps) => (
  <Container className={imageBreak ? 'mb-3 text-center' : 'text-center'} fluid>
    <Row>
      <Col>
        <GatsbyImage alt={alt} className={className} image={data} />
      </Col>
    </Row >
    {caption && (
      <Row>
        <Col>{caption}</Col>
      </Row>
    )}
  </Container>
);

export default Image;
