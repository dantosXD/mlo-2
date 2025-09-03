import { createServer } from 'graphql-yoga';
import { advanceStage, listStages, pubsub, PipelineStage } from './stages';

const typeDefs = /* GraphQL */ `
  type PipelineStage {
    applicationId: ID!
    stage: String!
    status: String!
    enteredAt: String!
    exitedAt: String
  }

  type Query {
    pipeline: [PipelineStage!]!
  }

  type Mutation {
    advanceStage(applicationId: ID!, stage: String!, status: String!): PipelineStage!
  }

  type Subscription {
    stageChanged: PipelineStage!
  }
`;

const resolvers = {
  Query: {
    pipeline: () => listStages(),
  },
  Mutation: {
    advanceStage: (_: unknown, args: { applicationId: number; stage: string; status: string }) =>
      advanceStage(Number(args.applicationId), args.stage, args.status),
  },
  Subscription: {
    stageChanged: {
      subscribe: () => pubsub.subscribe('stageChanged'),
      resolve: (payload: PipelineStage) => payload,
    },
  },
};

const server = createServer({ schema: { typeDefs, resolvers } });
server.start();
