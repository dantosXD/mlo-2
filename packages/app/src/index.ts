import { add } from '@mlo/math';

export function calculateTotal(values: number[]): number {
  return values.reduce((sum, v) => add(sum, v), 0);
}
