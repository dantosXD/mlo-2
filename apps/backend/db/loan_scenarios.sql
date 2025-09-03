-- Schema for linking loan scenarios to clients
CREATE TABLE IF NOT EXISTS loan_scenarios (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    scenario_name TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
