import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import './index.scss';

const LandingCard = (props) => {
  const {
    icon, tagline, title, url,
  } = props;

  const renderCard = () => (
    <Card className="landing-card bg-dark mb-3 py-2">
      <CardHeader className="py-0">
        <h2 className="text-light">{title}</h2>
      </CardHeader>
      <CardBody>
        <h3 className="text-light">{tagline}</h3>
        <div className="image-container">
          {(icon) || null}
        </div>
      </CardBody>
    </Card>
  );

  if (!url.startsWith('https://')) {
    return (
      <Link to={url}>
        {renderCard()}
      </Link>
    );
  }

  return (
    <a href={url} rel="noopener noreferrer" target="_blank">
      {renderCard()}
    </a>
  );
};

LandingCard.defaultProps = {
  icon: null,
};

LandingCard.propTypes = {
  icon: PropTypes.element,
  tagline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default LandingCard;
