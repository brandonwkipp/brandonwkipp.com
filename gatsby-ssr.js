import { config } from '@fortawesome/fontawesome-svg-core';
import PropTypes from 'prop-types';
import React from 'react';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/styles/base.scss';

// Disable autoAddCss to help Fontawesome Icons to be reasonable sizes
config.autoAddCss = false;

// Hack to get Gatsby to stop complaining
/* eslint import/prefer-default-export: 0 */

export const wrapRootElement = ({ element }) => (
  <div id="wrapper">
    {element}
  </div>
);

wrapRootElement.propTypes = {
  element: PropTypes.element.isRequired,
};
