import { graphql, StaticQuery } from 'gatsby';
import moment from 'moment';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import './index.scss';

const QUERY = graphql`
  query {
    contentfulAsset(title: { eq: "Headshot" }) {
      file {
        url
      }
    }
  }
`;

const Footer = () => (
  <StaticQuery
    query={QUERY}
    render={(data) => (
      <Container className="p-4 text-white" fluid id="footerContainer">
        <Row>
          <Col className="mb-0 mx-auto text-center">
            <img
              alt="Headshot"
              aria-hidden
              id="portrait"
              src={data.contentfulAsset.file.url}
            />
            <h4>Brandon W. Kipp</h4>
          </Col>
        </Row >
      </Container >
    )}
  />
);

export default Footer;
