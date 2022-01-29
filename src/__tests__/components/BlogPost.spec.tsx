import React from 'react';
import { render, screen } from '@testing-library/react';

import BlogPost from '@components/BlogPost';

describe('Test <BlogPost>', () => {
  const body = {
    raw: "{\"nodeType\":\"document\",\"data\":{},\"content\":[{\"nodeType\":\"paragraph\",\"content\":[{\"nodeType\":\"text\",\"value\":\"For a few years now\",\"marks\":[]}]}]}",
    references: [],
  };
  const date = '2020-01-01';
  const id = '123';
  const title = 'Test Title';

  it('<BlogPost> renders correctly', async () => {
    render(<BlogPost body={body} date={date} id={id} title={title} />);

    // Check <Footer> is rendered correctly
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeVisible();
  });
});