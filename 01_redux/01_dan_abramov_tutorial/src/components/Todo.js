/* eslint-env es6 */
'use strict';

import React from 'react';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';
import AddTodoFull from './AddTodoFull';

const Todo = () => (
  <div>
    <AddTodoFull/>
    <VisibleTodoList/>
    <Footer/>
  </div>
);

export default Todo;
