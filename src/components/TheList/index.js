import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import {
  Card, Col, Container, Row,
} from 'reactstrap';

import Show from './Show';
import './index.scss';

const SHOWS = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "show" }} },
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            artist
            city
            date(formatString: "MMMM Do, YYYY")
            state
            venue
          }
          html
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
            <Card className="p-3">
              {data.allMarkdownRemark.edges.map((show) => (
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
