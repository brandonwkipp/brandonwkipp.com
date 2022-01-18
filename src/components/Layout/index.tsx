import React from 'react';

import './index.scss';

interface LayoutProps {
  bg?: string;
  children: React.ReactNode;
}

const Layout = ({ bg, children }: LayoutProps) => (
  <div className={`layout ${bg}`}>
    {children}
  </div>
);

Layout.defaultProps = {
  bg: '',
};

export default Layout;
