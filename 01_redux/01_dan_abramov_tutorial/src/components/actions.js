/* eslint-env es6 */
'use strict';
const v4 = require('uuid/v4');

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text: text
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter: filter
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id: id
});
