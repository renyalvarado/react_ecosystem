/* eslint-env es6 */
'use strict';

import { combineReducers } from 'redux';
import { counter } from './counter';
import todos, * as fromTodos from './todos';

export default combineReducers({ counter, todos });

export const getVisibleTodos = (state, filter) => fromTodos.getVisibleTodos(state.todos, filter);
