const typeDefs = `
  type Query {
    hello: String
    add(a: Int!, b: Int!): Int!
  }
`;

module.exports = { typeDefs };
