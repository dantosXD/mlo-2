import { compute, combineAndMultiply } from '../src/calculator.js';

test('compute sums an array of numbers', () => {
  expect(compute([1, 2, 3, 4])).toBe(10);
});

test('combineAndMultiply integrates add and multiply', () => {
  expect(combineAndMultiply(1, 2, 3)).toBe(9);
});
