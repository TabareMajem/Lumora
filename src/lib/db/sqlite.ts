import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'ratings.db'));

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS ratings (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    mediaId TEXT NOT NULL,
    type TEXT NOT NULL,
    scores TEXT NOT NULL,
    comment TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    UNIQUE(userId, mediaId)
  );

  CREATE INDEX IF NOT EXISTS idx_ratings_userId ON ratings(userId);
  CREATE INDEX IF NOT EXISTS idx_ratings_mediaId ON ratings(mediaId);
`);

export { db };