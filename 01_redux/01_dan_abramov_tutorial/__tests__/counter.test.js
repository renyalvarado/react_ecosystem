import {counter} from '../src/counter';

test('Counter component', () => {
  expect(counter(0, {type: 'INCREMENT'})).toBe(1);
  expect(counter(1, {type: 'INCREMENT'})).toBe(2);
  expect(counter(2, {type: 'INCREMENT'})).toBe(3);
  expect(counter(2, {type: 'DECREMENT'})).toBe(1);
  expect(counter(1, {type: 'DECREMENT'})).toBe(0);
  expect(counter(0, {type: 'DECREMENT'})).toBe(-1);
  expect(counter(0, {type: 'OTHER_ACTION'})).toBe(0);
  expect(counter(undefined, {})).toBe(0);
});
