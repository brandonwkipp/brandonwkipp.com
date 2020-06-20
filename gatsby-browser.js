import propTypes from 'prop-types';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './src/styles/base.scss';

const wrapRootElement = ({ element }) => (
  <div id="wrapper">
    {element}
  </div>
);

wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
};

export default wrapRootElement;
