import moment from 'moment';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import './index.scss';

const Footer = () => (
  <footer role="contentinfo">
    <Container className="footer py-5" fluid>
      <Row>
        <Col>
          <Container className="p-0">
            <Row>
              <Col md={5}>
                <p className="mb-5">
                  &copy;
                  {' '}
                  {moment().format('YYYY')}
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
              <Col>
                <Container>
                  <Row>
                    <Col>
                      <h4>Music</h4>
                      <p>
                        <a
                          href="https://soundcloud.com/brandonwkipp/tracks"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Soundcloud
                        </a>
                      </p>
                    </Col>
                    <Col>
                      <h4>Connect</h4>
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
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
