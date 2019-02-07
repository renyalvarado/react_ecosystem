/* eslint-env es6 */
'use strict';
import React from 'react';
import { Provider } from 'react-redux';
import Todo from './todo';
import PropTypes from 'prop-types';

const Root = ({ store }) => (
  <Provider store={store}>
    <Todo/>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
