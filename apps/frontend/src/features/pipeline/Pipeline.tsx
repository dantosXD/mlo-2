import { useEffect, useState } from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';

type Stage = {
  applicationId: string;
  stage: string;
  status: string;
};

const STAGE_SUB = gql`
  subscription OnStageChanged {
    stageChanged {
      applicationId
      stage
      status
      enteredAt
    }
  }
`;

const ADVANCE_STAGE = gql`
  mutation AdvanceStage($appId: ID!, $stage: String!, $status: String!) {
    advanceStage(applicationId: $appId, stage: $stage, status: $status) {
      applicationId
      stage
      status
      enteredAt
    }
  }
`;

export function Pipeline() {
  const { data } = useSubscription(STAGE_SUB);
  const [advance] = useMutation(ADVANCE_STAGE);
  const [stages, setStages] = useState<Stage[]>([]);

  useEffect(() => {
    if (data?.stageChanged) {
      setStages((prev) => [...prev, data.stageChanged]);
    }
  }, [data]);

  return (
    <div>
      <button onClick={() => advance({ variables: { appId: 1, stage: 'UNDERWRITING', status: 'IN_PROGRESS' } })}>
        Advance Stage
      </button>
      <ul>
        {stages.map((s, idx) => (
          <li key={idx}>{s.stage} - {s.status}</li>
        ))}
      </ul>
    </div>
  );
}
