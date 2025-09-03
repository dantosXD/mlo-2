import { add, multiply } from '../src/math.js';

test('add adds numbers', () => {
  expect(add(2, 3)).toBe(5);
});

test('multiply multiplies numbers', () => {
  expect(multiply(2, 3)).toBe(6);
});
