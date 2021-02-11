import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import {
  Card, Col, Container, Row,
} from 'reactstrap';

import Show from './Show';
import './index.scss';

const SHOWS = graphql`
  query {
    allContentfulShow {
      edges {
        node {
          id
          artist
          date(formatString: "MMMM Do, YYYY")
          description {
            raw
          }
          venue {
            cityState
            name
          }
        }
      }
    }
  }
`;

const TheList = () => (
  <StaticQuery
    query={SHOWS}
    render={(data) => (
      <Container className="px-3" fluid id="theList">
        <Row>
          <Col className="mx-auto" md={6}>
            <Card className="border-0 p-3 rounded-0">
              {data.allContentfulShow.edges.map((show) => (
                <Show node={show.node} />
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
    )}
  />
);

export default TheList;
