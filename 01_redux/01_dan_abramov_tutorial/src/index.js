/* eslint-env es6 */
'use strict';

import {counter} from './counter';
import {createStore} from "redux";
import React from 'react';
import ReactDOM from 'react-dom';

const Counter = ({value, onIncrement, onDecrement}) => {
  return (<div>
      <h1 id="score">{value}</h1>
      <button id="add" onClick={onIncrement}>+</button>
      <button id="subtract" onClick={onDecrement}>-</button>
    </div>
  );
};

const store = createStore(counter);
const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()}
             onIncrement={() => {
               store.dispatch({type: 'INCREMENT'});
             }}
            onDecrement={() => {
              store.dispatch({type: 'DECREMENT'});
            }}/>,
    document.getElementById('root'));
};
render();
store.subscribe(render);
