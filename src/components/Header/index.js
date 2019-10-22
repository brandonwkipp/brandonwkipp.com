import React from 'react';
import { Link } from 'gatsby';
import {
  Collapse, DropdownMenu, DropdownToggle, Nav, NavItem, Navbar, NavbarToggler, UncontrolledDropdown,
} from 'reactstrap';
import './index.css';
import HomeLogo from '../../images/piano.png';
import GithubLogo from '../../images/icons/github-icon.png';
import LinkedInLogo from '../../images/icons/linkedin-icon.png';
import SoundCloudLogo from '../../images/icons/soundcloud-icon.png';
import TwitterLogo from '../../images/icons/twitter-icon.png';

const Header = () => (
  <>
    <Navbar className="navbar navbar-expand-md sticky-top py-1 justify-content-end">
      <NavbarToggler className=" mr-1" data-toggle="collapse" data-target="#collapsibleNavbar" />
      <Collapse isOpen navbar>
        <Nav className="container d-flex flex-column flex-md-row justify-content-between">
          <NavItem>
            <Link className="py-2 d-md-inline-block" to="/#">
              <img
                alt="Home Button"
                id="pianoButton"
                src={HomeLogo}
              />
            </Link>
          </NavItem>
          <NavItem>
            <Link className="py-2 d-md-inline-block" to="/#projects">Projects</Link>
          </NavItem>
          <NavItem>
            <Link className="py-2 d-md-inline-block" to="/blog">Blog</Link>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className="py-2 d-md-inline-block" nav caret>
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
      </Collapse>
    </Navbar>
  </>
);

export default Header;
