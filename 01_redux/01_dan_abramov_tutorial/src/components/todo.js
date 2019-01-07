/* eslint-env es6 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const FilterLink = ({ onClick, filter, visibilityFilter, children }) => {
  if (filter === visibilityFilter) {
    return <span>{children}</span>;
  }
  return (
    <a href='#'
      onClick={ e => {
        e.preventDefault();
        onClick(filter);
      }}>
      {children}
    </a>
  );
};

FilterLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const Footer = ({ onClick, visibilityFilter }) => (
  <p>
    Show:
    <FilterLink onClick={onClick} visibilityFilter={visibilityFilter} filter='SHOW_ALL'>
      All
    </FilterLink> { ' ' }
    <FilterLink onClick={onClick} visibilityFilter={visibilityFilter} filter='SHOW_ACTIVE'>
      Active
    </FilterLink> { ' ' }
    <FilterLink onClick={onClick} visibilityFilter={visibilityFilter} filter='SHOW_COMPLETED'>
      Completed
    </FilterLink> { ' ' }
  </p>
);

Footer.propTypes = {
  onClick: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string.isRequired
};

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

const AddTodo = ({ onAddClick }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button onClick={ () => {
        onAddClick(input.value);
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>);
};

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
};

let nextId = 0;

const Todo = ({ todos, visibilityFilter, store }) => (
  <div>
    <AddTodo onAddClick={(text) => {
      store.dispatch({
        type: 'ADD_TODO',
        id: nextId++,
        text: text
      });
    }}/>

    <TodoList todos={getVisibleTodos(visibilityFilter, todos)} onClick={id => {
      store.dispatch({
        type: 'TOGGLE_TODO',
        id: id
      });
    }}/>
    <Footer visibilityFilter={visibilityFilter} onClick={(filter) => {
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
      });
    }}/>
  </div>
);

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
};

export default Todo;
