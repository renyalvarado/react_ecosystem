/* eslint-env es6 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';

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
    const props = this.props;
    const store = props.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
    const props = this.props;
    const store = props.store;
    const state = store.getState();
    return (
      <Link active={props.filter === state} onClick={() => {
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: props.filter
        });
      }}>
        {props.children}
      </Link>
    );
  }
}

FilterLink.propTypes = {
  store: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired
};

const Footer = ({ store }) => (
  <p>
    Show:
    <FilterLink store={store} filter='SHOW_ALL'>
      All
    </FilterLink> { ' ' }
    <FilterLink store={store} filter='SHOW_ACTIVE'>
      Active
    </FilterLink> { ' ' }
    <FilterLink store={store} filter='SHOW_COMPLETED'>
      Completed
    </FilterLink> { ' ' }
  </p>
);

Footer.propTypes = {
  store: PropTypes.object.isRequired
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
    <Footer store={store}/>
  </div>
);

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
};

export default Todo;
