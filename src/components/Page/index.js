import { renderRichText } from 'gatsby-source-contentful/rich-text';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import rendererOptions from '@utils/renderer-options';

import './index.scss';

const Page = (props) => {
  const { data: { body } } = props;

  return (
    <main className="page">
      <Container className="py-5">
        <Row>
          <Col>
            {renderRichText(body, rendererOptions)}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

Page.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Page;