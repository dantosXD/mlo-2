-- Migration: create audit_log table with RLS policies
CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own audit logs
CREATE POLICY audit_log_user_policy ON audit_log
    FOR SELECT USING (user_id::text = current_setting('app.current_user_id', true));

-- Allow admins full access
GRANT SELECT, INSERT, UPDATE, DELETE ON audit_log TO admin;
CREATE POLICY audit_log_admin_policy ON audit_log
    USING (current_setting('app.current_role', true) = 'admin');
