import { excitedGreeting } from '../src/processor.js';

test('excitedGreeting concatenates and shouts', () => {
  expect(excitedGreeting('hello', 'world')).toBe('HELLOWORLD');
});
