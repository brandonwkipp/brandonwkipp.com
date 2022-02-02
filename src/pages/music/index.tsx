import { StaticQuery, graphql } from 'gatsby';
import {
  ContentfulRichTextGatsbyReference, RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import {
  Card, Col, Container, Row,
} from 'reactstrap';

import ShowCard from '@components/ShowCard';
import DefaultView from '@views/DefaultView';

import './index.scss';

const SHOWS = graphql`
  query {
    shows: allContentfulShow(sort: {order: DESC, fields: date}) {
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

interface Show {
  node: {
    artist: string;
    description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
    date: string;
    id: string;
    venue: {
      cityState: string;
      name: string;
    };
  }
}

interface PageProps {
  location: {
    pathname: string;
  };
}

const MusicPage = ({ location: { pathname } }: PageProps) => (
  <StaticQuery
    query={SHOWS}
    render={({ shows }) => (
      <DefaultView mainClass="music" path={pathname}>
        <Container className="px-3" fluid id="theList">
          <Row>
            <Col className="mx-auto" md={6}>
              <Card className="border-0 p-3 rounded-0">
                {shows.edges.map(({ node }: Show) => (
                  <ShowCard
                    artist={node.artist}
                    date={node.date}
                    description={node.description}
                    id={node.id}
                    venue={node.venue}
                  />
                ))}
              </Card>
            </Col>
          </Row>
        </Container>
      </DefaultView>
    )}
  />
);

export default MusicPage;