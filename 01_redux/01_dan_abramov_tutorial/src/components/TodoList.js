/* eslint-env es6 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {
      todos.map(todo =>
        <TodoItem key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
      )}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
