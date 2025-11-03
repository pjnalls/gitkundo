import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from '../models/schema.js';

export const getUsers = async (db: ReturnType<typeof drizzle>) =>
  await db.select().from(users);

export const createUser = async (
  db: ReturnType<typeof drizzle>,
  user: typeof users.$inferInsert
) => {
  try {
    console.log('Inserting user into database:\n', user);
    const userResult = await db.insert(users).values(user);
    console.log('User data saved to database.');
    return userResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
