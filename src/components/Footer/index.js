import { Link } from 'gatsby';
import moment from 'moment';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import Headshot from '../../images/1.png';
import './index.scss';

const Footer = () => (
  <Container className="p-4 text-white" fluid id="footerContainer">
    <Row>
      <Col className="mb-4 mb-0-md" md={3} sm={12} xs={12}>
        <img alt="Headshot" id="portrait" src={Headshot} />
        <h5>Brandon W. Kipp</h5>
        <h6 className="mb-0">
          ©
          {' '}
          {moment().format('YYYY')}
          {' '}
          All rights reserved.
        </h6>
      </Col>
      <Col className="text-center" md={3} sm={4} xs={4}>
        <h5><u>Social</u></h5>
        <p className="mb-1">
          <a className="text-muted" href="https://twitter.com/brandonwkipp">Twitter</a>
        </p>
        <p className="mb-1">
          <a className="text-muted" href="https://linkedin.com/in/brandonwkipp">LinkedIn</a>
        </p>
        <p className="mb-1">
          <a className="text-muted" href="mailto:brandonwkipp@gmail.com">Email</a>
        </p>
      </Col>
      <Col className="text-center" md={3} sm={4} xs={4}>
        <h5><u>CV</u></h5>
        {/* <p className="mb-1">
          <Link className="text-muted" to="/resume">Resume</Link>
        </p> */}
        <p className="mb-1">
          <a className="text-muted" href="https://github.com/brandonwkipp">GitHub</a>
        </p>
        <p>
          <a className="text-muted" href="https://soundcloud.com/brandonwkipp">SoundCloud</a>
        </p>
      </Col>
      <Col className="text-center" md={3} sm={4} xs={4}>
        <h5><u>Related</u></h5>
        <p className="mb-1">
          <a className="text-muted" href="https://radiumtr.ee">RadiumTree</a>
        </p>
      </Col>
    </Row>
  </Container>
);

export default Footer;
