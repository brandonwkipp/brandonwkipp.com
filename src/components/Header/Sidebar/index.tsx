import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import React from 'react';
import { slide as Menu } from 'react-burger-menu';

import './index.scss';

interface SidebarProps {
  pathname: string;
}

const Sidebar = ({ pathname }: SidebarProps) => (
  <Menu
    customBurgerIcon={<FontAwesomeIcon icon={faBars} />}
    width={280}
  >
    {pathname !== '/' ? <Link to="/">Home</Link> : null}
    {pathname !== '/blog' ? <Link to="/blog">Blog</Link> : null}
    {pathname !== '/about' ? <Link to="/about">About</Link> : null}
  </Menu>
);

export default Sidebar;
