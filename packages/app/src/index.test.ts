import { describe, expect, it } from 'vitest';
import { calculateTotal } from './index';

describe('calculateTotal', () => {
  it('sums an array of numbers', () => {
    expect(calculateTotal([1, 2, 3])).toBe(6);
  });
});
