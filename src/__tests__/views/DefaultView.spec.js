import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import DefaultView from '@views/DefaultView';

describe('Test <DefaultView>', () => {
  const child = <div>Some Text</div>;

  it('<DefaultView> renders correctly with minimum props', async () => {
    render(
      <DefaultView>
        {child}
      </DefaultView>
    );

    // Ensure <Header> is present
    expect(screen.getByRole('navigation', { name: 'Primary Navigation' })).toBeInTheDocument();

    // Ensure <Footer> is present
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});