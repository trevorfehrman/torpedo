import { mysqlTable, varchar, datetime, bigint } from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = mysqlTable('user', {
  id: varchar('id', { length: 64 }).primaryKey().notNull().unique(),
  firstName: varchar('first_name', { length: 30 }).notNull(),
  lastName: varchar('last_name', { length: 30 }).notNull(),
  createdAt: datetime('created_at', { mode: 'date' }),
  // createdAt: bigint('created_at', { mode: 'bigint' }),
  emailAddress: varchar('email_address', { length: 100 }).notNull(),
  imageUrl: varchar('image_url', { length: 300 }).notNull(),
  username: varchar('username', { length: 60 }),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
