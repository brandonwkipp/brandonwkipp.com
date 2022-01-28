import { Link } from 'gatsby';
import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import './index.scss';

interface LinkCardProps {
  icon?: JSX.Element;
  tagline: string;
  title: string;
  url: string;
}

const LinkCard = ({ icon, tagline, title, url }: LinkCardProps) => {
  const renderCard = (
    <Card className="link-card bg-dark mb-3 py-2">
      <CardHeader className="py-0">
        <h2 className="text-light">{title}</h2>
      </CardHeader>
      <CardBody>
        <p className="text-light">{tagline}</p>
        {icon && (
          <div className="image-container">{icon}</div>
        )}
      </CardBody>
    </Card>
  );

  if (!url.startsWith('https://')) {
    return (
      <Link to={url}>{renderCard}</Link>
    );
  }

  return (
    <a href={url} rel="noopener noreferrer" target="_blank">
      {renderCard}
    </a>
  );
};

export default LinkCard;
