import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

interface ImageProps {
  alt: string;
  caption?: string;
  className?: string;
  data: IGatsbyImageData;
}

const Image = ({ alt, caption, className, data }: ImageProps) => (
  <Container className="text-center" fluid>
    <Row>
      <Col>
        <GatsbyImage alt={alt} className={className} image={data} />
      </Col>
    </Row>
    {caption && (
      <Row>
        <Col>{caption}</Col>
      </Row>
    )}
  </Container>
);

export default Image;
