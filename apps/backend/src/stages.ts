import { createPubSub } from 'graphql-yoga';

export interface PipelineStage {
  applicationId: number;
  stage: string;
  status: string;
  enteredAt: string;
  exitedAt?: string;
}

const stages: PipelineStage[] = [];
export const pubsub = createPubSub<PipelineStage>();

export function advanceStage(appId: number, stage: string, status: string): PipelineStage {
  const record: PipelineStage = {
    applicationId: appId,
    stage,
    status,
    enteredAt: new Date().toISOString(),
  };
  stages.push(record);
  pubsub.publish('stageChanged', record);
  return record;
}

export function listStages(): PipelineStage[] {
  return stages;
}
