/* eslint-env es6 */
'use strict';

import { counter, addCounter, removeCounter, incrementCounter } from '../src/reducers/counter';
import deepFreeze from 'deep-freeze';

test('Counter function', () => {
  expect(counter(0, { type: 'INCREMENT' })).toBe(1);
  expect(counter(1, { type: 'INCREMENT' })).toBe(2);
  expect(counter(2, { type: 'INCREMENT' })).toBe(3);
  expect(counter(2, { type: 'DECREMENT' })).toBe(1);
  expect(counter(1, { type: 'DECREMENT' })).toBe(0);
  expect(counter(0, { type: 'DECREMENT' })).toBe(-1);
  expect(counter(0, { type: 'OTHER_ACTION' })).toBe(0);
  expect(counter(undefined, {})).toBe(0);
});

test('Add counter function', () => {
  const listBefore = [];
  const listAfter = [0];
  deepFreeze(listBefore);
  expect(addCounter(listBefore)).toEqual(listAfter);
});

test('Remove counter function', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];
  deepFreeze(listBefore);
  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
});

test('Increment counter function', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];
  deepFreeze(listBefore);
  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
});
