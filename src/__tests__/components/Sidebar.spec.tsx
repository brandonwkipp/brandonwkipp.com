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
    });
  });

  it('<Sidebar> renders links on the home page correctly', async () => {
    render(<Sidebar path={paths.root} />);

    waitFor(() => {
      // Check the root link is not displayed
      expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();

      // Check the About link is displayed
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About' })).toBeVisible();

      // Check the Blog link is displayed
      expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Blog' })).toBeVisible();
    });
  });

  it('<Sidebar> renders links on the about page correctly', async () => {
    render(<Sidebar path={paths.about} />);

    waitFor(() => {
      // Check the About link is not displayed
      expect(screen.queryByRole('link', { name: 'About' })).not.toBeInTheDocument();

      // Check the root link is displayed
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Home' })).toBeVisible();

      // Check the Blog link is displayed
      expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Blog' })).toBeVisible();
    });
  });

  it('<Sidebar> renders links on the blog page correctly', async () => {
    render(<Sidebar path={paths.blog} />);

    waitFor(() => {
      // Check the Blog link is not displayed
      expect(screen.queryByRole('link', { name: 'Blog' })).not.toBeInTheDocument();


      // Check the root link is displayed
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Home' })).toBeVisible();

      // Check the About link is displayed
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About' })).toBeVisible();
    });
  });

  it('<Sidebar> renders links on an unmatched page correctly', async () => {
    render(<Sidebar path={paths['test-unmatched']} />);

    waitFor(() => {
      // Check the root link is displayed
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Home' })).toBeVisible();

      // Check the About link is displayed
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About' })).toBeVisible();

      // Check the Blog link is displayed
      expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Blog' })).toBeVisible();
    });
  });
});