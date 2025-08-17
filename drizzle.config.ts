import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './libs/backend/db/src/lib/models/schema.ts',
  out: './libs/backend/db/src/lib/models/',
  dbCredentials: {
    host: 'localhost',
    port: parseInt(process.env.DATABASE_PORT as string),
    user: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    ssl: false
  },
});
