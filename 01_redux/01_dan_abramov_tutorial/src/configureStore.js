/* eslint-env es6 */
'use strict';
import throttle from 'lodash.throttle';
import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import allReducers from './reducers';

const configureStore = () => {
  const preLoadedState = loadState();
  /* eslint-disable no-underscore-dangle */
  const store = createStore(allReducers,
    preLoadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  /* eslint-enable */
  store.subscribe(throttle(() => saveState({
    counter: store.getState().counter,
    todos: store.getState().todos
  }), 1000));

  return store;
};

export default configureStore;
