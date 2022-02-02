import React from 'react';
import { render, screen } from '@testing-library/react';

import ShowCard from '@components/ShowCard';

describe('Test <ShowCard>', () => {
  const artist = 'Test Artist';
  const description = {
    raw: "{\"nodeType\":\"document\",\"data\":{},\"content\":[{\"nodeType\":\"paragraph\",\"content\":[{\"nodeType\":\"text\",\"value\":\"For a few years now\",\"marks\":[]}]}]}",
    references: [],
  };
  const date = '2020-01-01';
  const id = '123';
  const venue = {
    cityState: 'City State',
    name: 'Test Venue'
  }

  it('<ShowCard> renders correctly', async () => {
    render(<ShowCard artist={artist} date={date} description={description} id={id} venue={venue} />);

    // Check <Footer> is rendered correctly
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeVisible();
  });
});