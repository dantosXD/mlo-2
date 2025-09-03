-- Application and pipeline stage tables
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  applicant_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'NEW',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE pipeline_stages (
  id SERIAL PRIMARY KEY,
  application_id INTEGER NOT NULL REFERENCES applications(id),
  stage TEXT NOT NULL,
  status TEXT NOT NULL,
  entered_at TIMESTAMP NOT NULL DEFAULT NOW(),
  exited_at TIMESTAMP
);
