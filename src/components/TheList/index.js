import React from 'react';
import {
  Card, Col, ListGroup, ListGroupItemHeading,
  ListGroupItem, ListGroupItemText, Row,
} from 'reactstrap';

import JSONData from './TheList';
import './index.css';

const TheList = () => {
  const { bands } = JSONData;

  const getShows = () => (
    bands.map((band) => (
      <div key={band.order} className="mb-3">
        <h4>{band.name}</h4>
        <ListGroup>
          {band.shows.map((show) => {
            const link = (show.link)
              ? (
                <a href="https://www.youtube.com/watch?v=iJd5nfkb1uk">
                  {show.date}
                  {' '}
                  -
                  {' '}
                  {show.venue}
                </a>
              ) : (
                <>
                  {show.date}
                  {' '}
                  -
                  {' '}
                  {show.venue}
                </>
              );

            return (
              <ListGroupItem key={show.date}>
                <ListGroupItemHeading>
                  {link}
                </ListGroupItemHeading>
                <ListGroupItemText className="mb-0">
                  {show.description}
                </ListGroupItemText>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    ))
  );

  const shows = getShows();

  return (
    <>
      <div className="p-3" id="theList">
        <Row>
          <Col md={6}>
            <Card className="p-3">
              {shows}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TheList;
