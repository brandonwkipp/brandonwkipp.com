import { faBookOpen, faCode, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  Col, Container, Jumbotron, Row,
} from 'reactstrap';

import LandingCard from '@components/LandingCard';

import './index.scss';

const Landing = () => (
  <main className="landing">
    <Container className="p-0">
      <Jumbotron className="d-flex align-items-center justify-content-center">
        <h2 className="mb-0">Web Developer | Musician</h2>
      </Jumbotron>
      <Row id="projects" className="d-md-flex flex-md-equal no-gutters mt-md-3 pl-md-3">
        <Col>
          <LandingCard
            icon={<FontAwesomeIcon icon={faBookOpen} />}
            title="Blog"
            tagline="My latest thoughts"
            url="/blog"
          />
        </Col>
        <Col>
          <LandingCard
            icon={<FontAwesomeIcon icon={faCode} />}
            title="Code"
            tagline="Hacking all the way to a virtual"
            url="https://github.com/brandonwkipp"
          />
        </Col>
        <Col>
          <LandingCard
            icon={<FontAwesomeIcon icon={faIdCard} />}
            title="Resume"
            tagline="adfsd"
            url="/resume"
          />
        </Col>
      </Row>
    </Container>
  </main>
);

export default Landing;
