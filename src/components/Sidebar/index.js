import React from 'react';
import { Link } from 'gatsby';
import { slide as Menu } from 'react-burger-menu';
import './index.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Menu className="text-light" width={280}>
        <Link className="menu-item" to="/#">
          <h4>Home</h4>
        </Link>
        <Link className="menu-item" to="/#projects">
          <h4>Projects</h4>
        </Link>
        <Link className="menu-item" to="/blog">
          <h4>Blog</h4>
        </Link>
        <Link className="menu-item" to="/the-list">
          <h4>The List</h4>
        </Link>
        <Link className="menu-item" to="/blog">
          <h4>Contact</h4>
        </Link>
      </Menu>
    );
  }
}

export default Sidebar;
