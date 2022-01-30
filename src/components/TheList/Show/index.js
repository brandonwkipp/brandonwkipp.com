import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Show = (props) => {
  const { node } = props;
  const {
    artist, date, description, venue,
  } = node;

  return (
    <div className="mb-3">
      <ListGroup>
        <ListGroupItem>
          <h2>{artist}</h2>
          <h3>{date}</h3>
          <h3>
            {venue.name}
            {' '}
            (
            {venue.cityState}
            )
          </h3>
          <hr />
          <span className="mb-0">
            {(description) ? renderRichText(description) : null}
          </span>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default Show;
