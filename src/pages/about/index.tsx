import { graphql, StaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import Image from '@components/Image';
import { DefaultView } from '@views';

import './index.scss';

const IMG = graphql`
  query {
    imageSharp(fixed: { originalName: { eq: "profile.jpg" }} ) {
      gatsbyImageData(
        formats: [AUTO, WEBP]
        layout: FIXED
        quality: 100
        width: 250
      )
    }
  }
`;

const AboutPage = () => (
  <StaticQuery
    query={IMG}
    render={({ imageSharp: { gatsbyImageData } }) => {
      const image = getImage(gatsbyImageData);
      return (
        <DefaultView mainClass="page" noHeightContraint path={'/about'}>
          <Container className="py-3">
            <Row>
              <Col md={2} />
              <Col>
                {image && (
                  <Image alt="Headshot of me" data={gatsbyImageData} />
                )}
                <div className="body mx-auto">
                  Thanks for visiting my website. I am an experienced, self-taught, Full Stack Developer
                  based in the Midwest of the USA. In my spare time, you can find me tinkering with
                  Commodore 64 hardware, practicing guitar, or helping contribute to open-source projects on Github.
                </div>
              </Col>
              <Col md={2} />
            </Row>
          </Container>
        </DefaultView >
      );
    }}
  />
);

export default AboutPage;
