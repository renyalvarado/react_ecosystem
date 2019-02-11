/* eslint-env es6 */
'use strict';
import { createStore } from 'redux';
import allReducers from './reducers';

const logger = (store) => (next) => {
  if (!console.group) {
    return next;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd();
    return returnValue;
  };
};
// eslint-disable-next-line unused-parameter
const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};

const wrapDispatchWithMiddlewares = (store, middlewares) =>
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  });

const configureStore = () => {
  const middlewares = [promise];
  /* eslint-disable no-underscore-dangle */
  const store = createStore(allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }
  /* eslint-enable */
  wrapDispatchWithMiddlewares(store, middlewares);
  return store;
};

export default configureStore;
