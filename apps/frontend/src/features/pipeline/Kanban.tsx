import React from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';

const APPS_QUERY = gql`
  query AllApplications {
    applications { id applicantName stage }
  }
`;

const STAGE_SUB = gql`
  subscription OnStageUpdated {
    stageUpdated { id stage }
  }
`;

const stages = ['NEW', 'PROCESSING', 'APPROVED'];

export const Kanban: React.FC = () => {
  const { data } = useQuery(APPS_QUERY);
  useSubscription(STAGE_SUB);

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {stages.map((stage) => (
        <div key={stage} style={{ flex: 1 }}>
          <h3>{stage}</h3>
          {(data?.applications || [])
            .filter((a: any) => a.stage === stage)
            .map((a: any) => (
              <div key={a.id} style={{ border: '1px solid #ccc', margin: '4px', padding: '4px' }}>
                {a.applicantName}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Kanban;
