/* eslint-env es6 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class Todo extends React.Component {
  constructor (props) {
    super(props);
    this.nextId = 0;
  }

  render () {
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
        <ul>
          {
            this.props.todos.map(todo =>
              <li
                key={todo.id}
                onClick={() => {
                  this.props.store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                  });
                }}
                style={ {
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer'
                }}>
                {todo.text}
              </li>
            )}
        </ul>
      </div>);
  }
}

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  store: PropTypes.object.isRequired
};
