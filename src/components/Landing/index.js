import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import {
  Col, Container, Jumbotron, Row,
} from 'reactstrap';

import LandingCard from '@components/LandingCard';

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
    render={(data) => {
      const { knobject, raspbeat } = data;

      return (
        <main className="landing">
          <Container className="p-0">
            <Jumbotron className="d-flex align-items-center justify-content-center">
              <h2 className="mb-0">Web Developer | Musician</h2>
            </Jumbotron>
            <Row id="projects" className="d-md-flex flex-md-equal no-gutters mt-md-3 pl-md-3">
              <Col>
                <LandingCard
                  img={knobject}
                  title="Blog"
                  tagline="My latest thoughts"
                  url="/blog"
                />
              </Col>
              <Col>
                <LandingCard
                  img={knobject}
                  title="Resume"
                  tagline="About me"
                  url="/resume"
                />
              </Col>
              <Col>
                <LandingCard
                  img={raspbeat}
                  title="Raspbeat"
                  tagline="Hacking all the way to a virtual drumset"
                  url="https://github.com/brandonwkipp/raspbeat/"
                />
              </Col>
            </Row>
          </Container>
        </main>
      );
    }}
  />
);

export default Landing;
