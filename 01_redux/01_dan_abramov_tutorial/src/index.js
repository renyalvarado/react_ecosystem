/* eslint-env es6 */
'use strict';

import { createStore, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { counter } from './counter';
import { todos, visibilityFilter } from './todos';
import Counter from './components/counter';
import Todo from './components/todo';

const store = createStore(combineReducers({ counter, todos, visibilityFilter }));
// const store = createStore(todoApp);
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
const renderTodo = () => {
  ReactDOM.render(
    <Todo todos={store.getState().todos} store={store}/>,
    document.getElementById('todo'));
};

renderCounter();
renderTodo();
store.subscribe(renderTodo);
store.subscribe(renderCounter);
