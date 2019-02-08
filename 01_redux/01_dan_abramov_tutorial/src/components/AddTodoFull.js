/* eslint-env es6 */
'use strict';

import { connect } from 'react-redux';
import AddTodo from './AddTodo';

const AddTodoFull = connect()(AddTodo);

export default AddTodoFull;
