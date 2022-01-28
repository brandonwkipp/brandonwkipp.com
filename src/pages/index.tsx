import { faBookOpen, faCode, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  Col, Container, Jumbotron, Row,
} from 'reactstrap';

import LinkCard from '@components/LinkCard';
import DefaultView from '@views/DefaultView';

interface PageProps {
  location: {
    pathname: string;
  };
}

const IndexPage = ({ location: { pathname } }: PageProps) => (
  <DefaultView mainClass="landing" path={pathname}>
    <Container className="p-0">
      <Jumbotron className="d-flex align-items-center justify-content-center">
        <h2 className="mb-0">Full Stack Developer | Musician</h2>
      </Jumbotron>
      <Row className="mt-md-3 no-gutters">
        <Col md={4} sm={4} xs={6}>
          <LinkCard
            icon={<FontAwesomeIcon icon={faBookOpen} />}
            title="Blog"
            tagline="My thoughts"
            url="/blog"
          />
        </Col>
        <Col md={4} sm={4} xs={6}>
          <LinkCard
            icon={<FontAwesomeIcon icon={faCode} />}
            title="Code"
            tagline="My work"
            url="https://github.com/brandonwkipp"
          />
        </Col>
        <Col md={4} sm={4} xs={6}>
          <LinkCard
            icon={<FontAwesomeIcon icon={faIdCard} />}
            title="Resume"
            tagline="My trajectory"
            url="/resume"
          />
        </Col>
      </Row>
    </Container>
  </DefaultView>
);

export default IndexPage;
