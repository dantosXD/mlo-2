import { concat, shout } from './strings.js';

export function excitedGreeting(a, b) {
  return shout(concat(a, b));
}
