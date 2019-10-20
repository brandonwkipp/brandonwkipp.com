import React from 'react';
import propTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Layout = ({ children }) => (
  <div>{children}</div>
);

Layout.propTypes = {
  children: propTypes.arrayOf(propTypes.element).isRequired,
};

export default Layout;
