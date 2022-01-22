import React from 'react';
import { Helmet } from 'react-helmet';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';

import './index.scss';

interface DefaultViewProps {
  children: React.ReactNode;
  path: string;
}

const DefaultView = ({ children, path }: DefaultViewProps) => (
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
    <div className="default-view">
      <Header path={path} />
      <Sidebar path={path} />
      {children}
      <Footer />
    </div>
  </>
);

export default DefaultView;