/* eslint-env es6 */
'use strict';

import { counter } from './counter';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';

import PropTypes from 'prop-types';

const Counter = ({ value, onIncrement, onDecrement }) => {
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

const store = createStore(counter);
const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()}
      onIncrement={() => {
        store.dispatch({ type: 'INCREMENT' });
      }}
      onDecrement={() => {
        store.dispatch({ type: 'DECREMENT' });
      }} />,
    document.getElementById('root'));
};
render();
store.subscribe(render);
