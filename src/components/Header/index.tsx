import { Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Nav, NavItem, Navbar } from 'reactstrap';

import Sidebar from './Sidebar';

import './index.scss';

interface HeaderProps {
  location: {
    pathname: string;
  }
}

const Header = ({ location: { pathname } }: HeaderProps) => (
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
    <Sidebar pathname={pathname} />
    <nav className="nav-container sticky-top">
      <Navbar className="navbar-dark" expand="md">
        <Link className="navbar-brand" to="/">
          <h1 className="mb-0 text-light">
            Brandon W. Kipp
          </h1>
        </Link>
        <Nav className="d-none d-md-flex ml-auto" navbar>
          {pathname !== '/' ? (
            <NavItem className="mb-0 px-3 py-2">
              <Link to="/">Home</Link>
            </NavItem>
          ) : null}
          {pathname !== '/blog' ? (
            <NavItem className="mb-0 px-3 py-2">
              <Link to="/blog">Blog</Link>
            </NavItem>
          ) : null}
          {pathname !== '/about' ? (
            <NavItem className="mb-0 px-3 py-2">
              <Link to="/about">About</Link>
            </NavItem>
          ) : null}
        </Nav>
      </Navbar>
    </nav>
  </>
);

export default Header;
