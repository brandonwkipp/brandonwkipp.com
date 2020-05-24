import propTypes from 'prop-types';
import React from 'react';

const Layout = ({ children }) => (
  <div>{children}</div>
);

Layout.propTypes = {
  children: propTypes.arrayOf(propTypes.element).isRequired,
};

export default Layout;
