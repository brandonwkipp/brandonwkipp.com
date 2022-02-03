import React from 'react';
import { render, screen } from '@testing-library/react';

import ContentfulMocks from '@mocks/contentful';
import BlogPost from '@components/BlogPost';

describe('Test <BlogPost>', () => {
  const date = '2020-01-01';
  const id = '123';
  const title = 'Test Title';

  it('<BlogPost> renders correctly', async () => {
    render(
      <BlogPost
        body={ContentfulMocks.RichTextContentType}
        date={date}
        id={id}
        title={title}
      />
    );

    // Check <BlogPost> is rendered correctly
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeVisible();

    // Check <BlogPost> has correct date
    expect(screen.getByText(date)).toBeInTheDocument();
    expect(screen.getByText(date)).toBeVisible();

    // Check <BlogPost> has correct title
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: title })).toBeVisible();

    // Check <BlogPost> has correct body
    //expect(screen.getByText(body.raw)).toBeInTheDocument();
    //expect(screen.getByText(body.raw)).toBeVisible();
  });
});