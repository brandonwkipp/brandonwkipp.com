import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

interface ShowCardProps {
  artist: string;
  children: React.ReactNode;
  date: string;
  venue: {
    cityState: string;
    name: string;
  };
}

const ShowCard = ({ artist, children, date, venue }: ShowCardProps) => (
  <div className="mb-3">
    <ListGroup>
      <ListGroupItem>
        <p className="mb-0">{artist}</p>
        <p className="mb-0">{date}</p>
        <p className="mb-0">{`${venue.name} (${venue.cityState})`}</p>
        {children && (
          <>
            <hr />
            <span className="mb-0">{children}</span>
          </>
        )}
      </ListGroupItem>
    </ListGroup>
  </div>
);

export default ShowCard;
