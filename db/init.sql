-- Enable Postgres full text search indexes
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Clients index
CREATE INDEX IF NOT EXISTS idx_clients_fts
  ON clients USING GIN (to_tsvector('english', coalesce(name,'') || ' ' || coalesce(email,'')));

-- Loans index
CREATE INDEX IF NOT EXISTS idx_loans_fts
  ON loans USING GIN (to_tsvector('english', coalesce(description,'')));

-- Documents index
CREATE INDEX IF NOT EXISTS idx_documents_fts
  ON documents USING GIN (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content,'')));
