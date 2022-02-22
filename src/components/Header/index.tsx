import { Link } from 'gatsby';
import React from 'react';
import { Nav, NavItem, Navbar } from 'reactstrap';

import Sidebar from '@components/Sidebar';

import './index.scss';

interface HeaderProps {
  path: string;
}

const Header = ({ path }: HeaderProps) => (
  <nav aria-label="Primary Navigation" className="nav-container sticky-top">
    <Navbar className="navbar-dark" expand="md">
      <Link className="navbar-brand" to="/">
        <h1 className="mb-0 text-light">Brandon W. Kipp</h1>
      </Link>
      <Nav className="d-none d-md-flex ml-auto" navbar>
        {path !== '/' ? (
          <NavItem className="mb-0 px-3 py-2">
            <Link to="/">Home</Link>
          </NavItem>
        ) : null}
        {path !== '/blog' ? (
          <NavItem className="mb-0 px-3 py-2">
            <Link to="/blog">Blog</Link>
          </NavItem>
        ) : null}
        {path !== '/about' ? (
          <NavItem className="mb-0 px-3 py-2">
            <Link to="/about">About</Link>
          </NavItem>
        ) : null}
      </Nav>
    </Navbar>
    <Sidebar path={path} />
  </nav>
);

export default Header;
