import React from 'react';
import {
  Card, Col, ListGroup, ListGroupItemHeading,
  ListGroupItem, ListGroupItemText, Row,
} from 'reactstrap';

import JSONData from './content/shows';
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
                <>
                  <span className="d-inline-block w-100">
                    <a href="https://www.youtube.com/watch?v=iJd5nfkb1uk">
                      {show.date}
                    </a>
                  </span>
                  <span className="d-inline-block w-100">
                    {' '}
                    {show.venue}
                  </span>
                  <span className="d-inline-block w-100">
                    <small>
                      {show.city}
                      ,
                      {' '}
                      {show.state}
                    </small>
                  </span>
                </>
              ) : (
                <>
                  <span className="d-inline-block w-100">{show.date}</span>
                  <span className="d-inline-block w-100">
                    {' '}
                    {show.venue}
                  </span>
                  <span className="d-inline-block w-100">
                    <small>
                      {show.city}
                      ,
                      {' '}
                      {show.state}
                    </small>
                  </span>
                </>
              );

            return (
              <ListGroupItem key={show.date}>
                <ListGroupItemHeading>
                  {link}
                </ListGroupItemHeading>
                <hr />
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
          <Col md={5}>
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
