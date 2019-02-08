/* eslint-env es6 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const FilterLink = ({ filter, children }) => (
  <Link
    to={filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
  >
    {children}
  </Link>
);

FilterLink.propTypes = {
  filter: PropTypes.oneOf(['all', 'completed', 'active']).isRequired,
  children: PropTypes.node.isRequired
};

export default FilterLink;
