import { relations } from 'drizzle-orm';
import { mysqlTable, varchar, datetime, serial } from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 64 }).primaryKey().notNull().unique(),
  firstName: varchar('first_name', { length: 30 }).notNull(),
  lastName: varchar('last_name', { length: 30 }).notNull(),
  createdAt: datetime('created_at', { mode: 'date' }),
  emailAddress: varchar('email_address', { length: 100 }).notNull(),
  imageUrl: varchar('image_url', { length: 300 }).notNull(),
  username: varchar('username', { length: 60 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  boards: many(boards),
}));

export const boards = mysqlTable('boards', {
  id: serial('id').primaryKey(),
  boardName: varchar('board_name', { length: 64 }).notNull(),
  userId: varchar('user_id', { length: 64 }).notNull(),
});

export const boardsRelations = relations(boards, ({ one }) => ({
  user: one(users, {
    fields: [boards.userId],
    references: [users.id],
  }),
}));

// Users
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Boards
export const insertBoardSchema = createInsertSchema(boards);
export const selectBoardSchema = createSelectSchema(boards);

export type Board = typeof boards.$inferSelect;
export type NewBoard = typeof boards.$inferInsert;
