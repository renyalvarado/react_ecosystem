/* eslint-env es6 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

class FilterLink extends React.Component {
  componentDidMount () {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount () {
    this.unsubscribe();
  }
  render () {
    const { store } = this.context;
    const { filter, children } = this.props;
    const state = store.getState();
    return (
      <Link active={filter === state.visibilityFilter} onClick={() => {
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: filter
        });
      }}>
        {children}
      </Link>
    );
  }
}

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

FilterLink.contextTypes = {
  store: PropTypes.object
};

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

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(state.visibilityFilter, state.todos)
  };
};

const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onClick: (id) => dispatch({ type: 'TOGGLE_TODO', id: id })
  };
};

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
        dispatch({
          type: 'ADD_TODO',
          id: nextId++,
          text: input.value
        });
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

let nextId = 0;

const Todo = () => (
  <div>
    <AddTodoFull/>
    <VisibleTodoList/>
    <Footer/>
  </div>
);

export default Todo;
