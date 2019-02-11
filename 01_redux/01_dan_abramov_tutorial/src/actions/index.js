/* eslint-env es6 */
'use strict';
const v4 = require('uuid/v4');

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text: text
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id: id
});

export const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
});
