import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from "drizzle-orm"
import { users } from '../models/schema.js';

export const getUsers = async (db: ReturnType<typeof drizzle>) =>
  await db.select().from(users).where(eq(users.id, '0'));