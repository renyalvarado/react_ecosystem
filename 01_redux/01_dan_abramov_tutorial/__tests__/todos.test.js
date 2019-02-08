/* eslint-env es6 */
'use strict';

import deepFreeze from 'deep-freeze';
import todos from '../src/reducers/todos';
import allReducers from '../src/reducers';

test('Add to-do', () => {
  const stateBefore = [];
  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
});

test('Toggle to-do', () => {
  const stateBefore = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }, {
    id: 1,
    text: 'Go Shopping',
    completed: false
  }];
  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }, {
    id: 1,
    text: 'Go Shopping',
    completed: true
  }];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
});

test('Todo full reducer', () => {
  const initialState = {};
  const stateAfterAddTodo = {
    counter: 0,
    todos: [{
      id: 0,
      text: 'Learn Redux',
      completed: false
    }]
  };
  const addTodoAction = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  deepFreeze(initialState);
  deepFreeze(addTodoAction);
  expect(allReducers(initialState, addTodoAction)).toEqual(stateAfterAddTodo);
  const stateAfterToggleTodo = {
    counter: 0,
    todos: [{
      id: 0,
      text: 'Learn Redux',
      completed: true
    }]
  };
  const actionToggleTodo = {
    type: 'TOGGLE_TODO',
    id: 0
  };
  expect(allReducers(stateAfterAddTodo, actionToggleTodo)).toEqual(stateAfterToggleTodo);
});
