import { connect } from 'electric-sql/node';

// Establish a singleton ElectricSQL connection that can be reused across
// resolvers. This assumes that the DATABASE_URL environment variable points
// to the underlying Postgres database.
export const electric = connect(process.env.DATABASE_URL as string, {
  migrations: './src/db/views.sql',
});

export type ElectricClient = Awaited<ReturnType<typeof electric>>;
