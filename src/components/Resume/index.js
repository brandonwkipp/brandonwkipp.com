/* eslint react/no-danger: 0 */
import Marked from 'marked';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import cv from '../../markdown/cv.md';

import './index.scss';

const Resume = () => (
  <main className="resume">
    <Container className="py-3">
      <Row>
        <Col md={2} />
        <Col>
          <div dangerouslySetInnerHTML={{ __html: Marked(cv) }} />
        </Col>
        <Col md={2} />
      </Row>
    </Container>
  </main>
);

export default Resume;
