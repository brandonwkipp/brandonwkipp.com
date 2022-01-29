import React from 'react';
import { render, screen } from '@testing-library/react';

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
  });

  it('<Header> renders links on the home page correctly', async () => {
    render(<Header path={paths.root} />);

    // Check the root link is not displayed
    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();

    // Check the About link is displayed
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeVisible();

    // Check the Blog link is displayed
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Blog' })).toBeVisible();
  });

  it('<Header> renders links on the about page correctly', async () => {
    render(<Header path={paths.about} />);

    // Check the About link is not displayed
    expect(screen.queryByRole('link', { name: 'About' })).not.toBeInTheDocument();

    // Check the root link is displayed
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeVisible();

    // Check the Blog link is displayed
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Blog' })).toBeVisible();
  });

  it('<Header> renders links on the blog page correctly', async () => {
    render(<Header path={paths.blog} />);

    // Check the Blog link is not displayed
    expect(screen.queryByRole('link', { name: 'Blog' })).not.toBeInTheDocument();

    // Check the root link is displayed
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeVisible();

    // Check the About link is displayed
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeVisible();
  });

  it('<Header> renders links on an unmatched page correctly', async () => {
    render(<Header path={paths['test-unmatched']} />);

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