import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import './index.scss';

const Resume = () => (
  <Container className="pt-4 text-center" id="resumeContainer" fluid>
    <Row>
      <Col className="mx-auto" md={10}>
        <Row className="mb-4">
          <Col>
            <h1>Brandon W. Kipp</h1>
            <p>Minneapolis, MN | brandonwkipp@gmail.com</p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6} sm={12}>
            <h4 className="mb-4">Professional Experience</h4>
            <aside className="mb-5 text-left">
              <h5 className="mb-0">
                Science Museum of Minnesota,
                {' '}
                <small>Media Developer</small>
              </h5>
              <p>Mar. 2019 – Present | St. Paul, MN</p>
              <p>
                I&apos;ve worn many hats in this role: backend engineer, embedded system design,
                devops lead, etc. Recently, I have been augmenting the backend support systems
                for our new website overhaul.
              </p>
            </aside>
            <aside className="mb-5 text-left">
              <h5 className="mb-0">
                Auction Harmony,
                {' '}
                <small>Junior Developer</small>
              </h5>
              <p>Aug. 2016 – Mar. 2019 | Minneapolis, MN</p>
              <p>
                I work on the backend engineering team that powers our cash back shopping platform
                used by multiple clients. Together, we work to ensure all features are delivered in
                a timely manner and are performant and scalable to millions of users.
              </p>
            </aside>
            <aside className="text-left">
              <h5 className="mb-0">
                Maple Tree Studio,
                {' '}
                <small>Operations Manager/Audio Engineer</small>
              </h5>
              <p>Sep. 2011 – May 2016 | Beloit, WI</p>
              <p>
                Initially, I worked here as an Audio Engineer, recording bands, soloists,
                and anyone else that wanted to be recorded. I became Operations Manager
                in 2013, and was responsible for booking, maintenance, cleaning, in addition
                to my normal roles of recording and mixing
                audio.
              </p>
            </aside>
          </Col>
          <Col md={6} sm={12}>
            <Row>
              <Col className="mb-4" md={12}>
                <h4 className="mb-4">Technical Skills</h4>
                <aside className="text-left">
                  <p>Backend: Express, GraphQL, PHP 7+, MySQL, PSQL</p>
                  <p>Devops: Ansible, AWS, DigitalOcean, Docker, GCP, Git, Netlify</p>
                  <p>Embedded: Adafruit, Arduino, Raspberry Pi (Python)</p>
                  <p>Frontend: GatsbyJS, NodeJS, React, Sass</p>
                </aside>
              </Col>
              <Col md={12}>
                <h4>About Me</h4>
                <p className="text-left">
                  Experienced, self-taught, software engineer that is passionate about
                  improving the lives of other people. I love overcoming technical
                  hurdles. When I’m not changing the world through code, I am usually
                  tinkering with Commodore 64 hardware, playing guitar, or building new
                  things to help musicians in whatever way I can.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Resume;
