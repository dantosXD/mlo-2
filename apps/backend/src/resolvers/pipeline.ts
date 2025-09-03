import { PubSub } from 'graphql-subscriptions';
import type { Knex } from 'knex';

const pubsub = new PubSub();
const PIPELINE_UPDATED = 'PIPELINE_UPDATED';

interface Context {
  db: Knex;
}

export const pipelineResolvers = {
  Query: {
    async pipelineStages(_: unknown, { applicationId }: { applicationId: number }, { db }: Context) {
      return db('pipeline_stages').where({ application_id: applicationId });
    },
  },
  Mutation: {
    async advancePipeline(
      _: unknown,
      { applicationId, stageName }: { applicationId: number; stageName: string },
      { db }: Context,
    ) {
      const [stage] = await db('pipeline_stages')
        .insert({ application_id: applicationId, stage_name: stageName })
        .returning('*');
      await pubsub.publish(PIPELINE_UPDATED, { pipelineUpdated: stage });
      return stage;
    },
  },
  Subscription: {
    pipelineUpdated: {
      subscribe: () => pubsub.asyncIterator([PIPELINE_UPDATED]),
    },
  },
};

export default pipelineResolvers;
