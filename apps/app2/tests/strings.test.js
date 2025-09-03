import { concat, shout } from '../src/strings.js';

test('concat combines strings', () => {
  expect(concat('hello', 'world')).toBe('helloworld');
});

test('shout uppercases strings', () => {
  expect(shout('hi')).toBe('HI');
});
