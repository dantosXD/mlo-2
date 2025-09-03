CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    applicant_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE pipeline_stages (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    stage_name TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
