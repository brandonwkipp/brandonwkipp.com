import PropTypes from 'prop-types';
import React from 'react';

import './index.scss';

const Layout = ({ bg, children }) => (
  <div className={`layout ${bg}`}>
    {children}
  </div>
);

Layout.defaultProps = {
  bg: '',
};

Layout.propTypes = {
  bg: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Layout;
