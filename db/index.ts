import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { env } from '../env';
import * as schema from './schema';

// create the connection
const connection = connect({
  host: env.PLANETSCALE_DB_HOST,
  username: env.PLANETSCALE_DB_USERNAME,
  password: env.PLANETSCALE_DB_PASSWORD,
});

export const db = drizzle(connection, { schema });
