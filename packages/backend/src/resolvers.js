exports.resolvers = {
  Query: {
    hello: () => 'Hello World',
    add: (_, args) => args.a + args.b
  }
};
