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

const todos = (state = [], action) => {
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

export default todos;
