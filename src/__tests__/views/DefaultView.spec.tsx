import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import DefaultView from '@views/DefaultView';

describe('Test <DefaultView>', () => {
  const ariaLabel = 'Main Content';
  const child = <div>Some Text</div>;
  const className = 'some-class';
  const path = '/';

  it('<DefaultView> renders correctly with minimum props', async () => {
    render(
      <DefaultView path={path}>
        {child}
      </DefaultView>
    );

    // Ensure <Header> & <Sidebar> are present
    // TODO: Submit PR to react-burger-menu to add aria-label
    expect(screen.queryAllByRole('navigation')).toHaveLength(2);

    // Ensure <main> is present and displays correctly
    waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeVisible();
      expect(screen.getByRole('main')).toHaveClass('default-view', 'no-height-constraint');
      expect(screen.getByRole('main')).toHaveTextContent(child.props.children);
    });

    // Ensure <Footer> is present
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('<DefaultView> renders correctly with optional props', () => {
    render(
      <DefaultView mainAriaLabel={ariaLabel} mainClass={className} noHeightContraint path={path}>
        {child}
      </DefaultView>
    );

    // Check <main> renders classes correctly
    expect(screen.getByRole('main')).toHaveClass(className);
    expect(screen.getByRole('main')).not.toHaveClass('no-height-constraint');

    // Check <main> renders aria-label correctly
    expect(screen.getByRole('main', { name: ariaLabel })).toBeInTheDocument();
  });
});