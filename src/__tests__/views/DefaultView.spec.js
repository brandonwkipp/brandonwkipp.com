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

    // Ensure <Header> & <Sidebar> are present
    // TODO: Submit PR to react-burger-menu to add aria-label
    expect(screen.queryAllByRole('navigation')).toHaveLength(2);

    expect(screen.getByRole('main')).toBeInTheDocument();

    // Ensure <Footer> is present
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});