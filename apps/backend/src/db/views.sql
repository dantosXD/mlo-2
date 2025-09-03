-- SQL views used for aggregating metrics for the dashboard.

-- View providing key performance indicators.
CREATE VIEW IF NOT EXISTS kpi_metrics AS
SELECT
  COUNT(*) FILTER (WHERE status = 'closed-won')  AS deals_won,
  COUNT(*) FILTER (WHERE status = 'open')        AS deals_open,
  COALESCE(SUM(amount), 0)                       AS pipeline_value
FROM deals;

-- View grouping deals by pipeline stage for the Kanban board.
CREATE VIEW IF NOT EXISTS pipeline_stage_deals AS
SELECT stage, json_agg(deals.* ORDER BY updated_at DESC) AS deals
FROM deals
GROUP BY stage;
