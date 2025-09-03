import { add, multiply } from './math.js';

export function compute(values) {
  let total = 0;
  for (const val of values) {
    total = add(total, val);
  }
  return total;
}

export function combineAndMultiply(a, b, c) {
  return multiply(add(a, b), c);
}
