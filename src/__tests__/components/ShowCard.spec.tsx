import React from 'react';
import { render, screen } from '@testing-library/react';

import ContentfulMocks from '@mocks/contentful';
import ShowCard from '@components/ShowCard';

describe('Test <ShowCard>', () => {
  const artist = 'Test Artist';
  const date = '2020-01-01';
  const id = '123';
  const venue = {
    cityState: 'City State',
    name: 'Test Venue'
  }

  it('<ShowCard> renders correctly', async () => {
    render(
      <ShowCard
        artist={artist}
        date={date}
        description={ContentfulMocks.RichTextContentType}
        id={id}
        venue={venue}
      />
    );

    // Check <Footer> is rendered correctly
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeVisible();
  });
});