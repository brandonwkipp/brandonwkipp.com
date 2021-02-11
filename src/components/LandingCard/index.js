import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardHeader } from 'reactstrap';

import './index.scss';

const LandingCard = (props) => {
  const {
    img, tagline, title, url,
  } = props;

  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Card className="landing-card bg-dark mb-3 py-2">
        <CardHeader className="py-0">
          <h2 className="text-light">{title}</h2>
        </CardHeader>
        <h3 className="text-light">{tagline}</h3>
        <div className="image-container">
          <img alt="Knobject" aria-hidden src={img.file.url} />
        </div>
      </Card>
    </a>
  );
};

LandingCard.propTypes = {
  img: PropTypes.objectOf(PropTypes.any).isRequired,
  tagline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default LandingCard;
