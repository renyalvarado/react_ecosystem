/* eslint-env es6 */
'use strict';

import { createStore, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { counter } from './counter';
import { todos, visibilityFilter } from './todos';
import Counter from './components/counter';
import Todo from './components/todo';
import PropTypes from 'prop-types';

const store = createStore(combineReducers({ counter, todos, visibilityFilter }));
const renderCounter = () => {
  ReactDOM.render(
    <Counter value={store.getState().counter}
      onIncrement={() => {
        store.dispatch({ type: 'INCREMENT' });
      }}
      onDecrement={() => {
        store.dispatch({ type: 'DECREMENT' });
      }} />,
    document.getElementById('root'));
};

class Provider extends React.Component {
  getChildContext () {
    return {
      store: this.props.store
    };
  }
  render () {
    return this.props.children;
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

Provider.childContextTypes = {
  store: PropTypes.object
};

ReactDOM.render(
  <Provider store={store}>
    <Todo/>
  </Provider>,
  document.getElementById('todo'));

renderCounter();
store.subscribe(renderCounter);
