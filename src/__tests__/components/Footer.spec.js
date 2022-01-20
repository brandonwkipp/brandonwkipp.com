import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import Footer from '@components/Footer';

describe('Test <Footer>', () => {
  afterEach(() => {
    cleanup();
  });

  it('<Footer> renders correctly', async () => {
    render(<Footer />);

    // Check <Button> is rendered correctly
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeVisible();

    // Check default class exists on <Button>
    expect(screen.getByRole('contentinfo')).toHaveClass('footer');
  });
});