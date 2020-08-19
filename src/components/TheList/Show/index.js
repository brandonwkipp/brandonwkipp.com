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
          <ListGroupItemHeading>{node.artist}</ListGroupItemHeading>
          <span className="d-inline-block w-100">{node.date}</span>
          <span className="d-inline-block w-100">
            {' '}
            {node.venue.name}
            {' '}
            (
            {node.venue.cityState}
            )
          </span>
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
