/* eslint-env es6 */
'use strict';

import {counter} from './counter';
import {createStore} from "redux";

const scoreText = document.querySelector('#score');
const store = createStore(counter);
const render = () => {
  scoreText.innerHTML = store.getState();
};
render();

const addButton = document.querySelector('#add');
const subtractButton = document.querySelector('#subtract');
addButton.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'});
});
subtractButton.addEventListener('click', () => {
  store.dispatch({type: 'DECREMENT'});
});
store.subscribe(render);
