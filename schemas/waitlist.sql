CREATE TABLE IF NOT EXISTS "waitlist_entries" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "language" TEXT NOT NULL,
  "profile" TEXT NOT NULL,
  "intended_use" TEXT NOT NULL,
  "message" TEXT,
  "source_page" TEXT,
  "status" TEXT NOT NULL DEFAULT 'new',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
