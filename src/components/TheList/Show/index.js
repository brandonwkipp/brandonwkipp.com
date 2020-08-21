import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import propTypes from 'prop-types';
import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';

const Show = (props) => {
  const { node } = props;

  return (
    <div className="mb-3">
      <ListGroup>
        <ListGroupItem>
          <h2>{node.artist}</h2>
          <h3>{node.date}</h3>
          <h3>
            {node.venue.name}
            {' '}
            (
            {node.venue.cityState}
            )
          </h3>
          <hr />
          <span className="mb-0">
            {(node.description) ? documentToReactComponents(node.description.json) : null}
          </span>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

Show.propTypes = {
  node: propTypes.objectOf(propTypes.any).isRequired,
};

export default Show;
