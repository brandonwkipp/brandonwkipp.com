import React from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';

import { DefaultView } from '@views';

import './index.scss';

interface BlogViewProps {
  children: React.ReactNode;
  date: string;
  path: string
  title: string;
}

const BlogView = ({ children, date, path, title }: BlogViewProps) => {
  return (
    <DefaultView mainClass="blog" noHeightContraint path={path}>
      <Container>
        <Row>
          <Col md={2} />
          <Col>
            <Card role="article">
              <CardTitle className="text-center">
                <h2 className="mt-3">{title}</h2>
                <p>{date}</p>
              </CardTitle>
              <CardBody className="mb-1 mb-md-3 mx-auto px-0">
                {children}
              </CardBody>
            </Card>
          </Col>
          <Col md={2} />
        </Row>
      </Container>
    </DefaultView>
  );
}

export default BlogView;
