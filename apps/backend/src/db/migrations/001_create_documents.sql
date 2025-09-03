CREATE TABLE documents (
    key TEXT PRIMARY KEY,
    owner TEXT NOT NULL,
    checksum TEXT NOT NULL,
    status TEXT NOT NULL
);
