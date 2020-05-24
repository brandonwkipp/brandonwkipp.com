import propTypes from 'prop-types';
import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';

const Show = (props) => {
  const { node } = props;

  return (
    <div className="mb-3">
      <ListGroup>
        <ListGroupItem>
          <ListGroupItemHeading>{node.frontmatter.artist}</ListGroupItemHeading>
          <span className="d-inline-block w-100">{node.frontmatter.date}</span>
          <span className="d-inline-block w-100">
            {' '}
            {node.frontmatter.venue}
            {' '}
            (
            {node.frontmatter.city}
            ,
            {' '}
            {node.frontmatter.state}
            )
          </span>
          <hr />
          <span
            className="mb-0"
            dangerouslySetInnerHTML={{ __html: node.html }}
          />
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

Show.propTypes = {
  node: propTypes.objectOf(propTypes.any).isRequired,
};

export default Show;
