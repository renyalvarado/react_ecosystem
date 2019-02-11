/* eslint-env es6 */
'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import Counter from './components/counter';
import Root from './components/Root';
import configureStore from './configureStore';

const store = configureStore();

const renderCounter = () => {
  ReactDOM.render(
    <Counter value={store.getState().counter}
      onIncrement={() => {
        store.dispatch({ type: 'INCREMENT' });
      }}
      onDecrement={() => {
        store.dispatch({ type: 'DECREMENT' });
      }}/>,
    document.getElementById('root'));
};

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('todo'));

renderCounter();
store.subscribe(renderCounter);
