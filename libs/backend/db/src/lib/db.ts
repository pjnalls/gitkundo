import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './models/schema.js';
import * as relations from './models/relations.js';

const client = new Pool({
  connectionString: `postgresql://${process.env.DATABASE_USERNAME as string}:${
    process.env.DATABASE_PASSWORD as string
  }@localhost:${process.env.DATABASE_POST as string}/${
    process.env.DATABASE_NAME as string
  }`,
});

export const db = drizzle(client, { schema: { ...schema, ...relations } });
