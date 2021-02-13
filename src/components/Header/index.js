import { Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Nav, NavItem, Navbar } from 'reactstrap';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';

import './index.scss';

const Header = (props) => {
  const { location: { pathname } } = props;

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
      <Sidebar />
      <nav>
        <Navbar className="navbar-dark sticky-top" expand="md">
          <Link className="navbar-brand" to="/">
            <h1 className="mb-0 text-light">
              Brandon W. Kipp
            </h1>
          </Link>
          <Nav className="d-none d-md-flex ml-auto" navbar>
            {
              (pathname !== '/') ? (
                <NavItem className="mb-0 px-3 py-2">
                  <Link to="/">Home</Link>
                </NavItem>
              ) : <></>
            }
            {
              (pathname !== '/blog') ? (
                <NavItem className="mb-0 px-3 py-2">
                  <Link to="/blog">Blog</Link>
                </NavItem>
              ) : <></>
            }
            {
              (pathname !== '/about') ? (
                <NavItem className="mb-0 px-3 py-2">
                  <Link to="/about">About</Link>
                </NavItem>
              ) : <></>
            }
          </Nav>
        </Navbar>
      </nav>
    </>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
