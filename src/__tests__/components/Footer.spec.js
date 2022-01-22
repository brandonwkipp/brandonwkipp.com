import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Footer from '@components/Footer';

describe('Test <Footer>', () => {
  const currentYear = new Date().getFullYear();
  const links = [
    { link: 'mailto:brandonwkipp@gmail.com', title: 'brandonwkipp@gmail.com' },
    { link: 'https://github.com/brandonwkipp', title: 'GitHub' },
    { link: 'https://linkedin.com/in/brandonwkipp', title: 'LinkedIn' },
  ];

  it('<Footer> renders correctly', async () => {
    render(<Footer />);

    // Check <Footer> is rendered correctly
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeVisible();

    // Check default class exists on <Footer>
    expect(screen.getByRole('contentinfo')).toHaveClass('footer');

    // Check copyright is correct
    expect(screen.getByText(`© ${currentYear} Brandon W. Kipp`)).toBeInTheDocument();

    // Check contact links are valid
    waitFor(() => {
      links.forEach(({ link, title }) => {
        expect(screen.getByRole('link', { name: title })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: title })).toBeVisible();
        expect(screen.getByRole('link', { name: title })).toHaveAttribute('href', link);
      });
    });
  });
});