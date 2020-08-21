import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  DropdownMenu, DropdownToggle, Nav, NavItem,
  Navbar, UncontrolledDropdown,
} from 'reactstrap';

import Sidebar from './Sidebar';

import './index.scss';

library.add(faGithub);
library.add(faLinkedin);
library.add(faSoundcloud);

const QUERY = graphql`
  query {
    logo: contentfulAsset(title: { eq: "Logo" }) {
      file {
        url
      }
    }
  }
`;

const Header = () => (
  <StaticQuery
    query={QUERY}
    render={(data) => (
      <>
        <Helmet>
          <html lang="en" />
          <title>Brandon W. Kipp</title>
          <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#e2ffd8" />
          <meta name="Description" content="Web Developer. Musician." />
          <meta name="theme-color" content="#e2ffd8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        <Sidebar />
        <Navbar className="navbar-dark sticky-top" expand="md">
          <Link className="navbar-brand" to="/">
            <img alt="Home Button" className="mr-3" src={data.logo.file.url} />
            <h1 className="d-inline-block mb-0 text-light">Brandon W. Kipp</h1>
          </Link>
          <Nav className="d-none d-md-flex ml-auto" navbar>
            <NavItem className="px-4 py-2">
              <Link to="/blog">Blog</Link>
            </NavItem>
            <NavItem className="px-4 py-2">
              <Link to="/the-list">The List</Link>
            </NavItem>
            {
              (process.env.RESUME === true)
                ? (
                  <NavItem className="px-4 py-2">
                    <Link to="/resume">Resume</Link>
                  </NavItem>
                ) : (null)
            }
            <UncontrolledDropdown className="px-4 py-2" nav inNavbar>
              <DropdownToggle caret className="p-0 text-light" nav>Connect</DropdownToggle>
              <DropdownMenu right>
                <a
                  className="dropdown-item"
                  href="https://github.com/brandonwkipp"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    aria-hidden
                    className="d-inline-block mr-3"
                    icon={['fab', 'github']}
                  />
                  GitHub
                </a>
                <a
                  className="dropdown-item"
                  href="https://linkedin.com/in/brandonwkipp"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    aria-hidden
                    className="d-inline-block mr-3"
                    icon={['fab', 'linkedin']}
                  />
                  LinkedIn
                </a>
                <a
                  className="dropdown-item"
                  href="https://soundcloud.com/brandonwkipp"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    aria-hidden
                    className="d-inline-block mr-3"
                    icon={['fab', 'soundcloud']}
                  />
                  SoundCloud
                </a>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
      </>
    )}
  />
);

export default Header;
