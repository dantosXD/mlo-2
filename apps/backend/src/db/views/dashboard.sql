-- Dashboard views aggregating KPI information

-- Overall KPI numbers used on the dashboard
CREATE VIEW IF NOT EXISTS v_dashboard_kpis AS
SELECT
  (SELECT COUNT(*) FROM users)           AS total_users,
  (SELECT COUNT(*) FROM projects WHERE status = 'active') AS active_projects;

-- Pipeline Kanban aggregation
CREATE VIEW IF NOT EXISTS v_dashboard_pipeline AS
SELECT stage, COUNT(*) AS count
FROM pipeline
GROUP BY stage
ORDER BY stage;
