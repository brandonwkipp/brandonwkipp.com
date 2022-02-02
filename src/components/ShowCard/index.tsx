import {
  ContentfulRichTextGatsbyReference, RenderRichTextData, renderRichText
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

interface ShowCardProps {
  artist: string;
  description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  date: string;
  id: string;
  venue: {
    cityState: string;
    name: string;
  };
}

const ShowCard = ({
  artist, date, description, id, venue,
}: ShowCardProps) => (
  <div className="mb-3" key={id}>
    <ListGroup>
      <ListGroupItem>
        <p className="mb-0">{artist}</p>
        <p className="mb-0">{date}</p>
        <p className="mb-0">{`${venue.name} (${venue.cityState})`}</p>
        {description ? (
          <>
            <hr />
            <span className="mb-0">
              {renderRichText(description)}
            </span>
          </>
        ) : null}
      </ListGroupItem>
    </ListGroup>
  </div>
);

export default ShowCard;
