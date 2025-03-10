import { IUser } from '@/interfaces/user';
import pool from '@/lib/db';

/**
 * Create a new user in the database.
 */
export async function createUser(userData: {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider?: string;
  providerAccountId?: string;
}) {
  const query = `
    INSERT INTO users (name, email, password, image, provider, providerAccountId)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    userData.name,
    userData.email,
    userData.password ?? null,
    userData.image ?? null,
    userData.provider ?? null,
    userData.providerAccountId ?? null,
  ];

  const result = await pool.query(query, values);
  const newUser = result.rows[0];
  return newUser;
}

/**
 * Find a user by their email address.
 */
export async function findUserByEmail(
  email: string
): Promise<IUser | undefined> {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0] as IUser | undefined;
}

/**
 * Find a user by their provider and provider account ID.
 */
export async function findUserByProviderId(
  provider: string,
  providerAccountId: string
): Promise<IUser | undefined> {
  const result = await pool.query(
    `SELECT * FROM users WHERE provider = $1 AND providerAccountId = $2`,
    [provider, providerAccountId]
  );
  return result.rows[0] as IUser | undefined;
}
