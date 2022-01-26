import React from 'react';
import { Helmet } from 'react-helmet';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';

import './index.scss';

interface DefaultViewProps {
  children: React.ReactNode;
  mainAriaLabel?: string;
  mainClass?: string;
  noHeightContraint?: boolean;
  path: string;
}

const DefaultView = ({ children, mainAriaLabel, mainClass, noHeightContraint, path }: DefaultViewProps) => {
  const viewClass = noHeightContraint ? 'default-view no-height-constraint' : 'default-view';

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Brandon W. Kipp</title>
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#e2ffd8" />
        <meta name="Description" content="Web Developer | Musician." />
        <meta name="theme-color" content="#e2ffd8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <div className={viewClass}>
        <Header path={path} />
        <Sidebar path={path} />
        <main aria-label={mainAriaLabel} className={mainClass}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default DefaultView;