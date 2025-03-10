import { IUser } from '@/interfaces/user';
import db from '@/lib/db';

export function createUser(userData: {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider?: string;
  providerAccountId?: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password, image, provider, providerAccountId)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    userData.name,
    userData.email,
    userData.password ?? null,
    userData.image ?? null,
    userData.provider ?? null,
    userData.providerAccountId ?? null
  );

  return info.lastInsertRowid;
}

export function findUserByEmail(email: string) {
  return db
    .prepare(
      `
    SELECT * FROM users WHERE email = ?
  `
    )
    .get(email) as IUser | undefined;
}

export function findUserByProviderId(
  provider: string,
  providerAccountId: string
) {
  return db
    .prepare(
      `
    SELECT * FROM users WHERE provider = ? AND providerAccountId = ?
  `
    )
    .get(provider, providerAccountId);
}
