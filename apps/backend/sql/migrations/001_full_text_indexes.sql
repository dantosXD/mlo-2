-- Enable Postgres full-text search indexes for key tables
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Index client names for fast search
CREATE INDEX IF NOT EXISTS clients_name_tsv_idx
  ON clients USING GIN (to_tsvector('english', name));

-- Index loan titles
CREATE INDEX IF NOT EXISTS loans_title_tsv_idx
  ON loans USING GIN (to_tsvector('english', title));

-- Index document titles
CREATE INDEX IF NOT EXISTS documents_title_tsv_idx
  ON documents USING GIN (to_tsvector('english', title));
