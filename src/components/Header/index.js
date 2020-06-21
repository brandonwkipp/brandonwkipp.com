import { Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  DropdownMenu, DropdownToggle, Nav, NavItem,
  Navbar, NavbarBrand, UncontrolledDropdown,
} from 'reactstrap';

import HomeLogo from '../../images/noun_Music_1952166.svg';
import GithubLogo from '../../images/icons/github-icon.png';
import LinkedInLogo from '../../images/icons/linkedin-icon.png';
import SoundCloudLogo from '../../images/icons/soundcloud-icon.png';
import TwitterLogo from '../../images/icons/twitter-icon.png';

import Sidebar from './Sidebar';

import './index.scss';

const Header = () => (
  <>
    <Helmet>
      <title>Brandon W. Kipp</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#e2ffd8" />
      <meta name="Description" content="Web Developer. Musician." />
      <meta name="theme-color" content="#e2ffd8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    <Sidebar />
    <Navbar className="navbar-dark sticky-top" expand="md">
      <NavbarBrand>
        <Link to="/">
          <img alt="Home Button" className="mr-3" src={HomeLogo} />
          <h2 className="d-inline-block mb-0 text-light">Brandon W. Kipp</h2>
        </Link>
      </NavbarBrand>
      <Nav className="d-none d-md-flex ml-auto" navbar>
        <NavItem className="px-4 py-2">
          <Link to="/blog">Blog</Link>
        </NavItem>
        <NavItem className="px-4 py-2">
          <Link to="/the-list">The List</Link>
        </NavItem>
        <UncontrolledDropdown className="px-4 py-2" nav inNavbar>
          <DropdownToggle caret className="p-0 text-light" nav>Connect</DropdownToggle>
          <DropdownMenu right>
            <a
              className="dropdown-item"
              href="https://github.com/brandonwkipp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="GitHub Logo"
                className="icon"
                src={GithubLogo}
              />
              {' '}
              GitHub
            </a>
            <a
              className="dropdown-item"
              href="https://linkedin.com/in/brandonwkipp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="LinkedIn Logo"
                className="icon"
                src={LinkedInLogo}
              />
              {' '}
              LinkedIn
            </a>
            <a
              className="dropdown-item"
              href="https://twitter.com/brandonwkipp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="Twitter Logo"
                className="icon"
                src={TwitterLogo}
              />
              {' '}
              Twitter
            </a>
            <a
              className="dropdown-item"
              href="https://soundcloud.com/brandonwkipp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="SoundCloud Logo"
                className="icon"
                src={SoundCloudLogo}
              />
              {' '}
              SoundCloud
            </a>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Navbar>
  </>
);

export default Header;
