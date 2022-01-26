import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import React from 'react';
import { slide as Menu } from 'react-burger-menu';

import './index.scss';

interface SidebarProps {
  path: string;
}

const Sidebar = ({ path }: SidebarProps) => (
  <Menu customBurgerIcon={<FontAwesomeIcon icon={faBars} />} width={280}>
    {path !== '/' ? <Link to="/">Home</Link> : null}
    {path !== '/blog' ? <Link to="/blog">Blog</Link> : null}
    {path !== '/about' ? <Link to="/about">About</Link> : null}
  </Menu>
);

export default Sidebar;
