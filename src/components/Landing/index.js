import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import './index.scss';

const QUERY = graphql`
  query {
    knobject: contentfulAsset(title: { eq: "Knobject" }) {
      file {
        url
      }
    }

    raspbeat: contentfulAsset(title: { eq: "Raspbeat" }) {
      file {
        url
      }
    }
  }
`;

const Landing = () => (
  <StaticQuery
    query={QUERY}
    render={(data) => (
      <Container fluid id="landing">
        <Row className="bg-light position-relative overflow-hidden p-3 p-md-5">
          <Col className="mx-auto my-0 my-md-5 p-lg-5" md={6}>
            <h2 className="mb-0">Web Developer. Musician.</h2>
          </Col>
          <div className="d-none d-md-block product-device" />
          <div className="d-none d-md-block product-device product-device-2" />
        </Row>
        <Row id="projects" className="d-md-flex flex-md-equal mt-md-3 pl-md-3">
          <Col className="bg-dark mr-md-3 px-3 px-md-5">
            <a
              href="https://github.com/brandonwkipp/raspbeat/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="my-3 py-3">
                <h2>Raspbeat</h2>
                <h3>Hacking all the way to a virtual drumset</h3>
              </div>
              <div aria-hidden className="project-image-container">
                <img
                  alt="Raspbeat"
                  id="raspbeatLogo"
                  src={data.raspbeat.file.url}
                />
              </div>
            </a>
          </Col>
          <Col className="bg-dark mr-md-3 px-3 px-md-5">
            <a
              href="https://brandonwkipp.github.io/knobject-js"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="my-3 p-3">
                <h2>Knobject</h2>
                <h3>A small Knob-like JavaScript component</h3>
              </div>
              <div aria-hidden className="project-image-container">
                <img
                  alt="Knobject"
                  id="knobjectLogo"
                  src={data.knobject.file.url}
                />
              </div>
            </a>
          </Col>
        </Row>
      </Container>
    )}
  />
);

export default Landing;
