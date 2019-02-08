/* eslint-env es6 */
'use strict';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../actions/actions';

const getVisibleTodos = (filter, todos) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
  }
};

const mapStateToTodoListProps = (state) => ({
  todos: getVisibleTodos(state.visibilityFilter, state.todos)
});

const mapDispatchToTodoListProps = (dispatch) => ({
  onClick (id) {
    dispatch(toggleTodo(id));
  }
});

const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

VisibleTodoList.contextTypes = {
  store: PropTypes.object
};

export default VisibleTodoList;
