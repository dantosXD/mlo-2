import React from 'react';

interface PipelineStage {
  stage: string;
  count: number;
}

interface DashboardKpis {
  totalUsers: number;
  activeProjects: number;
  pipeline: PipelineStage[];
}

const sample: DashboardKpis = {
  totalUsers: 0,
  activeProjects: 0,
  pipeline: [],
};

/**
 * Dashboard page rendering KPI numbers, a simple bar chart and a
 * Kanban-style column for the project pipeline.  In a real
 * application the data would be fetched from the backend via a
 * REST or GraphQL API but here we render static sample data.
 */
const Dashboard: React.FC = () => {
  const chartData = {
    labels: sample.pipeline.map((p) => p.stage),
    datasets: [
      {
        label: 'Pipeline',
        data: sample.pipeline.map((p) => p.count),
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <section className="kpis">
        <p>Total Users: {sample.totalUsers}</p>
        <p>Active Projects: {sample.activeProjects}</p>
      </section>

      <section className="chart">
        {/* Placeholder for chart rendering library */}
        <pre>{JSON.stringify(chartData, null, 2)}</pre>
      </section>

      <section className="kanban" style={{ display: 'flex', gap: '1rem' }}>
        {sample.pipeline.map((stage) => (
          <div key={stage.stage}>
            <h3>{stage.stage}</h3>
            <p>{stage.count} items</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
