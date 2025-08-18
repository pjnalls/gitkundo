import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from '../models/schema.js';

export const getUsers = async (db: ReturnType<typeof drizzle>) =>
  await db.select().from(users);
