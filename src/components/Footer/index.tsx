import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import './index.scss';

const Footer = () => (
  <footer className="footer py-md-5 py-3" role="contentinfo">
    <Container className="w-50">
      <Row>
        <Col md={5}>
          <p className="mb-5">
            &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            Brandon W. Kipp
          </p>
          <p>
            To get in touch, please send me an email at
            {' '}
            <u>
              <a href="mailto:brandonwkipp@gmail.com">brandonwkipp@gmail.com</a>
            </u>
          </p>
        </Col>
        <Col md={1} />
        <Col md={6} xs={12}>
          <Container className="mt-3 px-0" fluid>
            <Row>
              <Col>
                <p className="footer-title">Connect with me</p>
                <p>
                  <a
                    href="https://github.com/brandonwkipp"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Github
                  </a>
                </p>
                <p>
                  <a
                    href="https://linkedin.com/in/brandonwkipp"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
