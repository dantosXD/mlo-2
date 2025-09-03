import React from 'react';
import { gql, useQuery, useSubscription } from '@apollo/client';

// GraphQL query fetching KPIs and pipeline data from the backend
const DASHBOARD_QUERY = gql`
  query DashboardData {
    kpis { deals_won deals_open pipeline_value }
    pipeline { stage deals }
  }
`;

// Subscription providing live KPI updates via ElectricSQL
const KPI_SUBSCRIPTION = gql`
  subscription OnKPIUpdated {
    kpiUpdated { deals_won deals_open pipeline_value }
  }
`;

export default function Dashboard() {
  const { data, refetch } = useQuery(DASHBOARD_QUERY);
  useSubscription(KPI_SUBSCRIPTION, { onData: () => refetch() });

  const kpi = data?.kpis || { deals_won: 0, deals_open: 0, pipeline_value: 0 };
  const pipeline = data?.pipeline || [];

  return (
    <div className="dashboard">
      <section className="widgets">
        <KPICard label="Deals Won" value={kpi.deals_won} />
        <KPICard label="Open Deals" value={kpi.deals_open} />
        <KPICard label="Pipeline Value" value={kpi.pipeline_value} />
      </section>
      <PipelineBoard stages={pipeline} />
    </div>
  );
}

interface CardProps { label: string; value: number }
function KPICard({ label, value }: CardProps) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
    </div>
  );
}

interface PipelineStage { stage: string; deals: any[] }
function PipelineBoard({ stages }: { stages: PipelineStage[] }) {
  return (
    <div className="pipeline-board">
      {stages.map((s) => (
        <div key={s.stage} className="pipeline-column">
          <h3>{s.stage}</h3>
          {s.deals?.map((d: any) => (
            <div key={d.id} className="deal-card">
              {d.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
