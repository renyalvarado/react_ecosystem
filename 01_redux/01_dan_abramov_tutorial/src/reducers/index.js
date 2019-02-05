/* eslint-env es6 */
'use strict';

import { combineReducers } from 'redux';
import { counter } from './counter';
import { todos, visibilityFilter } from './todos';

export default combineReducers({ counter, todos, visibilityFilter });
