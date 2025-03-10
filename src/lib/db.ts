// lib/db.ts
import Database from 'better-sqlite3';
import path from 'path';

// Choose a filename for your SQLite DB:
const DB_PATH = path.join(process.cwd(), 'mydatabase.sqlite');

// Initialize the database
const db = new Database(DB_PATH);

// Optional: enable WAL to improve concurrency
db.pragma('journal_mode = WAL');

// Run CREATE TABLE statements if tables don’t exist.
// You can store all your tables (users, businesses, reviews, etc.) here or in separate migrations.
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,  -- If you store password (for email+pass logins)
    image TEXT,     -- For Google or other provider avatars
    provider TEXT,  -- e.g. "google" or "credentials"
    providerAccountId TEXT, -- e.g. user’s Google ID
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS businesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    logo TEXT,
    websiteUrl TEXT,
    instagram TEXT,
    score REAL DEFAULT 0,
    category TEXT NOT NULL,
    description TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    reviewCount INTEGER DEFAULT 0,
    ratingDistribution TEXT DEFAULT '{}',
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    businessId INTEGER NOT NULL,
    authorId TEXT NOT NULL,
    authorName TEXT NOT NULL,
    rating INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    verifiedPurchase INTEGER DEFAULT 0,
    helpful INTEGER DEFAULT 0,
    images TEXT DEFAULT '[]',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
