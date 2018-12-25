/* eslint-env es6 */
'use strict';

const todo = (state, action) => {
  switch (action.type) {
    case ('ADD_TODO'):
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case ('TOGGLE_TODO'):
      if (action.id === state.id) {
        return { ...state, completed: !state.completed };
      }
      return state;
  }
};

export const todos = (state = [], action) => {
  switch (action.type) {
    case ('ADD_TODO'):
      return [
        ...state,
        todo(undefined, action)
      ];
    case ('TOGGLE_TODO'):
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

export const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case ('SET_VISIBILITY_FILTER'):
      return action.filter;
    default:
      return state;
  }
};

export const todoApp = (state, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};
