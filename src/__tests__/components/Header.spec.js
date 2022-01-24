import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Header from '@components/Header';

describe('Test <Header>', () => {
  const paths = {
    'about': '/about',
    'blog': '/blog',
    'root': '/',
    'test-unmatched': '/test-unmatched',
  };

  it('<Header> renders correctly with minimum props', async () => {
    render(<Header path={paths.root} />);

    // Ensure top-level nav is present
    expect(screen.getByRole('navigation', { name: 'Primary Navigation' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary Navigation' })).toBeVisible();

    // Check the root link is not displayed
    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();

    // Check the About link displays correctly
    expect(screen.queryByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'About' })).toBeVisible();

    // Check the Blog link displays correctly
    expect(screen.queryByRole('link', { name: 'Blog' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Blog' })).toBeVisible();
  });
});