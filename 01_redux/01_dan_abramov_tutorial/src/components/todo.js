/* eslint-env es6 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const FilterLink = ({ store, filter, visibilityFilter, children }) => {
  if (filter === visibilityFilter) {
    return <span>{children}</span>;
  }
  return (
    <a href='#'
      onClick={ e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: filter
        });
      }}>
      {children}
    </a>
  );
};

FilterLink.propTypes = {
  store: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
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

export default class Todo extends React.Component {
  constructor (props) {
    super(props);
    this.nextId = 0;
  }
  render () {
    const visibleTodos = getVisibleTodos(this.props.visibilityFilter, this.props.todos);
    return (
      <div>
        <input ref={node => { this.input = node; }}/>
        <button onClick={() => {
          this.props.store.dispatch({
            type: 'ADD_TODO',
            id: this.nextId++,
            text: this.input.value
          });
          this.input.value = '';
        }
        }>
          Add Todo
        </button>
        <TodoList todos={visibleTodos} onClick={id => {
          this.props.store.dispatch({
            type: 'TOGGLE_TODO',
            id: id
          });
        }}/>
        <p>
          Show:
          <FilterLink store={this.props.store} visibilityFilter={this.props.visibilityFilter} filter='SHOW_ALL'>
            All
          </FilterLink> { ' ' }
          <FilterLink store={this.props.store} visibilityFilter={this.props.visibilityFilter} filter='SHOW_ACTIVE'>
            Active
          </FilterLink> { ' ' }
          <FilterLink store={this.props.store} visibilityFilter={this.props.visibilityFilter} filter='SHOW_COMPLETED'>
            Completed
          </FilterLink> { ' ' }
        </p>
      </div>);
  }
}

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
};
