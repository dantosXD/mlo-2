import { ApolloServer, gql } from 'apollo-server';
import { Pool } from 'pg';

// Create Postgres connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost/mlo'
});

// GraphQL type definitions
const typeDefs = gql`
  type Client { id: ID!, name: String! }
  type Loan { id: ID!, description: String! }
  type Document { id: ID!, title: String! }

  union SearchResult = Client | Loan | Document

  type Query {
    search(term: String!): [SearchResult!]!
  }
`;

// Resolver implementation
const resolvers = {
  SearchResult: {
    __resolveType(obj: any) {
      return obj.__typename;
    }
  },
  Query: {
    async search(_: unknown, { term }: { term: string }) {
      const { rows } = await pool.query(
        `SELECT id, name as title, 'Client' as __typename FROM clients
           WHERE to_tsvector('english', coalesce(name,'') || ' ' || coalesce(email,'')) @@ plainto_tsquery($1)
         UNION ALL
         SELECT id, description as title, 'Loan' as __typename FROM loans
           WHERE to_tsvector('english', coalesce(description,'')) @@ plainto_tsquery($1)
         UNION ALL
         SELECT id, title, 'Document' as __typename FROM documents
           WHERE to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content,'')) @@ plainto_tsquery($1)
        `,
        [term]
      );
      return rows.map(r => {
        if (r.__typename === 'Client') return { __typename: 'Client', id: r.id, name: r.title };
        if (r.__typename === 'Loan') return { __typename: 'Loan', id: r.id, description: r.title };
        return { __typename: 'Document', id: r.id, title: r.title };
      });
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
