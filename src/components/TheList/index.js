import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';

import './index.css';
import Show from './Show';

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
      <>
        <div className="p-3" id="theList">
          <Row>
            <Col className="mx-auto" md={6}>
              <Card className="p-3">
                {data.allMarkdownRemark.edges.map((show) => (
                  <Show node={show.node} />
                ))}
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )}
  />
);

export default TheList;
