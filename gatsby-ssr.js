import propTypes from 'prop-types';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './src/styles/base.scss';

// Hack to get Gatsby to stop complaining
/* eslint import/prefer-default-export: 0 */

export const wrapRootElement = ({ element }) => (
  <div id="wrapper">
    {element}
  </div>
);

wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
};
