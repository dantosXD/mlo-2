const { ApolloServer, gql, PubSub } = require('apollo-server');

// In-memory data to demo stage transitions
const applications = [];
let nextId = 1;
const pubsub = new PubSub();
const STAGE_UPDATED = 'STAGE_UPDATED';

const typeDefs = gql`
  type Application {
    id: ID!
    applicantName: String!
    stage: String!
    enteredAt: String!
    exitedAt: String
  }

  type Query {
    applications: [Application!]!
  }

  type Mutation {
    createApplication(applicantName: String!): Application!
    updateStage(id: ID!, stage: String!): Application!
  }

  type Subscription {
    stageUpdated: Application!
  }
`;

const resolvers = {
  Query: {
    applications: () => applications,
  },
  Mutation: {
    createApplication: (_, { applicantName }) => {
      const app = {
        id: nextId++,
        applicantName,
        stage: 'NEW',
        enteredAt: new Date().toISOString(),
        exitedAt: null,
      };
      applications.push(app);
      return app;
    },
    updateStage: (_, { id, stage }) => {
      const app = applications.find((a) => a.id == id);
      if (!app) throw new Error('Application not found');
      app.stage = stage;
      app.enteredAt = new Date().toISOString();
      app.exitedAt = null;
      pubsub.publish(STAGE_UPDATED, { stageUpdated: app });
      return app;
    },
  },
  Subscription: {
    stageUpdated: {
      subscribe: () => pubsub.asyncIterator([STAGE_UPDATED]),
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`GraphQL server ready at ${url}`);
});
