import moment from 'moment';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import Headshot from '../../images/1.png';
import './index.scss';

const Footer = () => (
  <Container className="p-4 text-white" fluid id="footerContainer">
    <Row>
      <Col className="mb-0">
        <div className="mx-auto text-center">
          <img alt="Headshot" id="portrait" src={Headshot} />
          <h5>Brandon W. Kipp</h5>
          <h6 className="mb-0">
            ©
            {' '}
            {moment().format('YYYY')}
            {' '}
            All rights reserved.
          </h6>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Footer;
