/* eslint-env es6 */
'use strict';

import React from 'react';

import PropTypes from 'prop-types';

export default function Counter ({ value, onIncrement, onDecrement }) {
  return (<div>
    <h1 id="score">{value}</h1>
    <button id="add" onClick={onIncrement}>+</button>
    <button id="subtract" onClick={onDecrement}>-</button>
  </div>
  );
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
};
