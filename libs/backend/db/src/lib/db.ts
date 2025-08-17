import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle({
  connection: {
    host: `localhost:${process.env.DATABASE_PORT}`,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    ssl: true,
  },
});
