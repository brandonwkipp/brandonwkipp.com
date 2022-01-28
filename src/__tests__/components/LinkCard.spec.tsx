import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import LinkCard from '@components/LinkCard';

describe('Test <LinkCard>', () => {
  const links = ['https://google.com', '/page'];
  const tagline = 'Some Text';
  const title = 'Some Title';

  it('<LinkCard> renders correctly with minimum props', async () => {
    render(<LinkCard tagline={tagline} title={title} url={links[0]} />);

    // Check <LinkCard> is rendered correctly
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

  it('<LinkCard> renders icons correctly', async () => {
    render(
      <LinkCard
        icon={< FontAwesomeIcon icon={faBars} />}
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

  it('<LinkCard> renders external & internal links correctly', async () => {
    // Render external link
    const { rerender } = render(<LinkCard tagline={tagline} title={title} url={links[0]} />);

    // Check <LinkCard> renders external links correctly
    expect(screen.getByRole('link')).toHaveAttribute('href', links[0]);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');

    // Render internal link
    rerender(<LinkCard tagline={tagline} title={title} url={links[1]} />);

    // Check <LinkCard> renders internal links correctly
    expect(screen.getByRole('link')).toHaveAttribute('href', links[1]);
    expect(screen.getByRole('link')).not.toHaveAttribute('target');
  });
});