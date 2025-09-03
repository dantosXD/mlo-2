-- Audit log table and row-level security policies

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  actor text not null,
  action text not null,
  entity text,
  details jsonb,
  created_at timestamptz not null default now()
);

alter table audit_log enable row level security;

-- Allow admins to read all audit log entries
create policy "admin_read_audit" on audit_log
  for select
  using (current_setting('role', true) = 'admin');

-- Allow the service role to insert audit entries
create policy "service_insert_audit" on audit_log
  for insert
  with check (current_setting('role', true) in ('admin', 'service'));

