/* eslint-env es6 */
'use strict';

import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import allReducers from './reducers/index';
import Counter from './components/counter';
import Todo from './components/todo';
import { loadState, saveState } from './localStorage';

const preLoadedState = loadState();
/* eslint-disable no-underscore-dangle */
const store = createStore(allReducers,
  preLoadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */
store.subscribe(() => saveState({
  counter: store.getState().counter,
  todos: store.getState().todos
}));
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
  <Provider store={store}>
    <Todo/>
  </Provider>,
  document.getElementById('todo'));

renderCounter();
store.subscribe(renderCounter);
