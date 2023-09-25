import type { Config } from 'drizzle-kit';
import { env } from './env';

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: env.PLANETSCALE_DB_URL,
  },
} satisfies Config;
