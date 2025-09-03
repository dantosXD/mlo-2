import type { ElectricClient } from '../electric';
import { electric } from '../electric';

// Types describing KPI information returned by the database view.
export interface KPI {
  deals_won: number;
  deals_open: number;
  pipeline_value: number;
}

export const dashboardResolver = {
  Query: {
    // Expose aggregated KPI metrics from the dedicated SQL view.
    kpis: async (): Promise<KPI> => {
      const db: ElectricClient = await electric;
      const { rows } = await db.raw('SELECT * FROM kpi_metrics');
      return rows[0] as KPI;
    },
    // Provide the Kanban pipeline grouped by stage.
    pipeline: async () => {
      const db: ElectricClient = await electric;
      const { rows } = await db.raw('SELECT * FROM pipeline_stage_deals');
      return rows;
    },
  },
  Subscription: {
    // Live KPI updates leveraging ElectricSQL's liveQuery capability.
    kpiUpdated: {
      subscribe: async function* () {
        const db: ElectricClient = await electric;
        const iterator = db.liveQuery('SELECT * FROM kpi_metrics');
        for await (const rows of iterator) {
          yield { kpiUpdated: rows[0] as KPI };
        }
      },
    },
  },
};
