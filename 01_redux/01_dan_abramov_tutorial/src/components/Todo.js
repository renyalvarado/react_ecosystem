/* eslint-env es6 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';
import AddTodoFull from './AddTodoFull';

const Todo = ({ params }) => (
  <div>
    <AddTodoFull/>
    <VisibleTodoList filter={params.filter || 'all'}/>
    <Footer/>
  </div>
);

Todo.propTypes = {
  params: PropTypes.shape({
    filter: PropTypes.string
  })
};

export default Todo;
