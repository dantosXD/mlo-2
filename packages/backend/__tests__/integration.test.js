const { graphql, buildSchema } = require('graphql');
const { resolvers } = require('../src/resolvers');
const { typeDefs } = require('../src/schema');

test('hello query returns greeting', async () => {
  const schema = buildSchema(typeDefs);
  const rootValue = {
    hello: resolvers.Query.hello,
    add: resolvers.Query.add
  };
  const result = await graphql({ schema, source: '{ hello }', rootValue });
  expect(result.data.hello).toBe('Hello World');
});
