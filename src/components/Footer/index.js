import React from 'react';
import {
  Col, Row,
} from 'reactstrap';
import moment from 'moment';
import Headshot from '../../images/1.png';
import './index.css';

const Footer = () => (
  <footer className="col-12 col-md py-4 text-white">
    <Row>
      <Col md={3}>
        <img alt="Headshot" id="portrait" src={Headshot} />
        <h5>Brandon W. Kipp</h5>
        <h6 className="mb-0">
          Copyright ©
          {' '}
          {moment().format('YYYY')}
          {' '}
          All rights reserved.
        </h6>
      </Col>
      <Col md={3}>
        <h5>Social</h5>
        <ul className="list-unstyled text-small">
          <li><a className="text-muted" href="https://twitter.com/brandonwkipp">Twitter</a></li>
          <li><a className="text-muted" href="https://linkedin.com/in/brandonwkipp">LinkedIn</a></li>
          <li><a className="text-muted" href="mailto:brandonwkipp@gmail.com">Email</a></li>
        </ul>
      </Col>
      <Col md={3}>
        <h5>Portfolio</h5>
        <ul className="list-unstyled text-small">
          <li><a className="text-muted" href="https://github.com/brandonwkipp">GitHub</a></li>
          <li><a className="text-muted" href="https://soundcloud.com/brandonwkipp">SoundCloud</a></li>
        </ul>
      </Col>
      <Col md={3}>
        <h5>Related</h5>
        <ul className="list-unstyled text-small">
          <li><a className="text-muted" href="https://radiumtr.ee">RadiumTree</a></li>
        </ul>
      </Col>
    </Row>
  </footer>
);

export default Footer;
