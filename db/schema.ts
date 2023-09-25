import { mysqlTable, varchar, timestamp, bigint } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('user', {
  id: varchar('id', { length: 64 }).primaryKey().notNull().unique(),
  firstName: varchar('first_name', { length: 30 }).notNull(),
  lastName: varchar('last_name', { length: 30 }).notNull(),
  createdAt: bigint('created_at', { mode: 'number' }),
  emailAddress: varchar('email_address', { length: 100 }).notNull(),
  imageUrl: varchar('image_url', { length: 100 }).notNull(),
  username: varchar('username', { length: 60 }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
