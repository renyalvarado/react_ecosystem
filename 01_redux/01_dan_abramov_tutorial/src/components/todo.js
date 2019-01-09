/* eslint-env es6 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo, setVisibilityFilter, toggleTodo } from './actions';

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a href='#' onClick={e => {
      e.preventDefault();
      onClick();
    }}> {children}
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick () {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const Footer = () => (
  <p>
    Show:
    <FilterLink filter='SHOW_ALL'>
      All
    </FilterLink> { ' ' }
    <FilterLink filter='SHOW_ACTIVE'>
      Active
    </FilterLink> { ' ' }
    <FilterLink filter='SHOW_COMPLETED'>
      Completed
    </FilterLink> { ' ' }
  </p>
);

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

const TodoItem = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={ {
      textDecoration: completed ? 'line-through' : 'none',
      cursor: 'pointer'
    }}>
    {text}
  </li>
);

TodoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

const TodoList = ({ todos, onClick }) => (
  <ul>
    {
      todos.map(todo =>
        <TodoItem key={todo.id} {...todo} onClick={() => onClick(todo.id)} />
      )}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
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

const AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button onClick={ () => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>);
};
AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const AddTodoFull = connect()(AddTodo);

const Todo = () => (
  <div>
    <AddTodoFull/>
    <VisibleTodoList/>
    <Footer/>
  </div>
);

export default Todo;
