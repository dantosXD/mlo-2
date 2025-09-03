-- Migration to create clients and loan_scenarios tables

CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS loan_scenarios (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    scenario_name VARCHAR(255) NOT NULL,
    principal NUMERIC(15,2) NOT NULL,
    annual_rate NUMERIC(5,2) NOT NULL,
    term_months INTEGER NOT NULL,
    buydown_rate NUMERIC(5,2) DEFAULT 0,
    buydown_months INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

