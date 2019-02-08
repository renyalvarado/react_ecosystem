/* eslint-env es6 */
'use strict';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions/actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter || 'all')
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;
