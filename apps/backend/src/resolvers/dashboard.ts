import type { Pool } from 'pg';

interface PipelineStage {
  stage: string;
  count: number;
}

export interface DashboardKpis {
  totalUsers: number;
  activeProjects: number;
  pipeline: PipelineStage[];
}

/**
 * Load dashboard KPI information from the database.
 *
 * The function expects a PostgreSQL client `db` and queries
 * a couple of views that aggregate the data required by the
 * dashboard.  These views are created in `db/views/dashboard.sql`.
 */
export async function getDashboardKpis(db: Pool): Promise<DashboardKpis> {
  const kpiRow = await db.query('SELECT total_users, active_projects FROM v_dashboard_kpis');
  const pipelineRows = await db.query<PipelineStage>('SELECT stage, count FROM v_dashboard_pipeline');

  return {
    totalUsers: Number(kpiRow.rows[0]?.total_users ?? 0),
    activeProjects: Number(kpiRow.rows[0]?.active_projects ?? 0),
    pipeline: pipelineRows.rows.map((r) => ({ stage: r.stage, count: Number(r.count) })),
  };
}

/**
 * Example resolver that can be used with a GraphQL server.
 */
export const dashboardResolvers = {
  Query: {
    dashboardKpis: async (_parent: unknown, _args: unknown, ctx: { db: Pool }) => {
      return getDashboardKpis(ctx.db);
    },
  },
};
