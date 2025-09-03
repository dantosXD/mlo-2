const { resolvers } = require('../src/resolvers');

test('add resolver adds numbers', () => {
  expect(resolvers.Query.add(null, { a: 1, b: 2 })).toBe(3);
});
