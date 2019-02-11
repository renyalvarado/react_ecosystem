/* eslint-env es6 */
'use strict';
import { createStore } from 'redux';
import allReducers from './reducers';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const configureStore = () => {
  /* eslint-disable no-underscore-dangle */
  const store = createStore(allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }
  /* eslint-enable */
  return store;
};

export default configureStore;
