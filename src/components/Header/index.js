import React, { Component } from 'react';
import { Link } from 'gatsby';
import {
  DropdownMenu, DropdownToggle, Nav, NavItem,
  Navbar, NavbarBrand, UncontrolledDropdown,
} from 'reactstrap';
import Sidebar from '../Sidebar';

import './index.css';
import HomeLogo from '../../images/piano.png';
import GithubLogo from '../../images/icons/github-icon.png';
import LinkedInLogo from '../../images/icons/linkedin-icon.png';
import SoundCloudLogo from '../../images/icons/soundcloud-icon.png';
import TwitterLogo from '../../images/icons/twitter-icon.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    return (
      <>
        <Sidebar />
        <Navbar className="navbar-dark sticky-top" expand="md">
          <NavbarBrand>
            <img
              alt="Home Button"
              className="mr-3"
              src={HomeLogo}
            />
            <h2 className="d-inline-block mb-0 text-light">Brandon W. Kipp</h2>
          </NavbarBrand>
          <Nav className="d-none d-md-flex d-lg-flex ml-auto" navbar>
            <NavItem>
              <Link className="px-4 py-2 d-inline-block" to="/#projects">Projects</Link>
            </NavItem>
            <NavItem>
              <Link className="px-4 py-2 d-inline-block" to="/blog">Blog</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="px-4 py-2 d-inline-block" nav caret>
                 Connect
              </DropdownToggle>
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
  }
}

export default Header;
