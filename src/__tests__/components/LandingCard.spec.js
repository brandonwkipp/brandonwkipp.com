import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import LandingCard from '@components/LandingCard';

describe('Test <LandingCard>', () => {
  const links = ['https://google.com', '/page'];
  const tagline = 'Some Text';
  const title = 'Some Title';

  it('<LandingCard> renders correctly with minimum props', async () => {
    render(<LandingCard tagline={tagline} title={title} url={links[0]} />);

    // Check <LandingCard> is rendered correctly
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeVisible();

    // Check tagline is correct
    expect(screen.getByText(tagline)).toBeInTheDocument();
    expect(screen.getByText(tagline)).toBeVisible();

    // Check title is correct
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeVisible();

    // Check icon container isn't rendered if not specified
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('<LandingCard> renders icons correctly', async () => {
    render(
      <LandingCard
        icon={<FontAwesomeIcon icon={faBars} />}
        tagline={tagline}
        title={title}
        url={links[0]}
      />
    );

    waitFor(() => {
      // Check icon container is rendered
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeVisible();
    });
  });

  it('<LandingCard> renders external & internal links correctly', async () => {
    // Render external link
    const { rerender } = render(<LandingCard tagline={tagline} title={title} url={links[0]} />);

    // Check <LandingCard> renders external links correctly
    expect(screen.getByRole('link')).toHaveAttribute('href', links[0]);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');

    // Render internal link
    rerender(<LandingCard tagline={tagline} title={title} url={links[1]} />);

    // Check <LandingCard> renders internal links correctly
    expect(screen.getByRole('link')).toHaveAttribute('href', links[1]);
    expect(screen.getByRole('link')).not.toHaveAttribute('target');
  });
});