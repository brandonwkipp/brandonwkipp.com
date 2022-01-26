import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Sidebar from '@components/Sidebar';

describe('Test <Sidebar>', () => {
  const paths = {
    'about': '/about',
    'blog': '/blog',
    'root': '/',
    'test-unmatched': '/test-unmatched',
  };

  it('<Sidebar> renders correctly with minimum props', async () => {
    render(<Sidebar path={paths.root} />);

    waitFor(() => {
      // Ensure Sidebar nav is present
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeVisible();

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
});