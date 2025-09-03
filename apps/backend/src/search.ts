import { ApolloServer, gql } from 'apollo-server';
import { Pool } from 'pg';

// Reuse a single connection pool; assumes PG* environment variables are set
const pool = new Pool();

// GraphQL schema for federated search across several entities
const typeDefs = gql`
  type Client { id: ID!, name: String! }
  type Loan { id: ID!, title: String! }
  type Document { id: ID!, title: String! }

  union SearchResult = Client | Loan | Document

  type Query {
    search(term: String!): [SearchResult!]!
  }
`;

const resolvers = {
  Query: {
    // Perform a very small full‑text search across the three tables
    search: async (_: unknown, { term }: { term: string }) => {
      const clients = await pool.query(
        "SELECT id, name FROM clients WHERE to_tsvector('english', name) @@ plainto_tsquery($1) LIMIT 10",
        [term],
      );
      const loans = await pool.query(
        "SELECT id, title FROM loans WHERE to_tsvector('english', title) @@ plainto_tsquery($1) LIMIT 10",
        [term],
      );
      const documents = await pool.query(
        "SELECT id, title FROM documents WHERE to_tsvector('english', title) @@ plainto_tsquery($1) LIMIT 10",
        [term],
      );

      return [
        ...clients.rows.map((r) => ({ __typename: 'Client', ...r })),
        ...loans.rows.map((r) => ({ __typename: 'Loan', ...r })),
        ...documents.rows.map((r) => ({ __typename: 'Document', ...r })),
      ];
    },
  },
};

export const server = new ApolloServer({ typeDefs, resolvers });

// Start the server when executed directly (useful for local testing)
if (require.main === module) {
  server.listen().then(({ url }) => {
    console.log(`🚀 Search service ready at ${url}`);
  });
}
