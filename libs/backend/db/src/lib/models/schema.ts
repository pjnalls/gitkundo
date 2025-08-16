import { pgTable, index, unique, uuid, varchar, text, timestamp, foreignKey, boolean, primaryKey, check } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 100 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	bio: text(),
	profilePictureUrl: varchar("profile_picture_url", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_users_email").using("btree", table.email.asc().nullsLast().op("text_ops")),
	index("idx_users_username").using("btree", table.username.asc().nullsLast().op("text_ops")),
	unique("users_username_key").on(table.username),
	unique("users_email_key").on(table.email),
]);

export const repositories = pgTable("repositories", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	ownerId: uuid("owner_id").notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: text(),
	visibile: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_repositories_owner_name").using("btree", table.ownerId.asc().nullsLast().op("uuid_ops"), table.name.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "repositories_owner_id_fkey"
		}).onDelete("cascade"),
	unique("repositories_owner_id_name_key").on(table.ownerId, table.name),
]);

export const commits = pgTable("commits", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	repositoryId: uuid("repository_id").notNull(),
	committerId: uuid("committer_id").notNull(),
	sha: varchar({ length: 40 }).notNull(),
	message: text(),
	committedAt: timestamp("committed_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_commits_committer_id").using("btree", table.committerId.asc().nullsLast().op("uuid_ops")),
	index("idx_commits_repository_id").using("btree", table.repositoryId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.repositoryId],
			foreignColumns: [repositories.id],
			name: "commits_repository_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.committerId],
			foreignColumns: [users.id],
			name: "commits_committer_id_fkey"
		}).onDelete("restrict"),
	unique("commits_sha_key").on(table.sha),
]);

export const branches = pgTable("branches", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	repositoryId: uuid("repository_id").notNull(),
	name: varchar({ length: 100 }).notNull(),
	latestCommitId: uuid("latest_commit_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_branches_repository_id").using("btree", table.repositoryId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.repositoryId],
			foreignColumns: [repositories.id],
			name: "branches_repository_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.latestCommitId],
			foreignColumns: [commits.id],
			name: "branches_latest_commit_id_fkey"
		}).onDelete("set null"),
	unique("branches_repository_id_name_key").on(table.repositoryId, table.name),
]);

export const issues = pgTable("issues", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	repositoryId: uuid("repository_id").notNull(),
	reporterId: uuid("reporter_id").notNull(),
	assigneeId: uuid("assignee_id"),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	status: varchar({ length: 20 }).default('open').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_issues_assignee_id").using("btree", table.assigneeId.asc().nullsLast().op("uuid_ops")),
	index("idx_issues_reporter_id").using("btree", table.reporterId.asc().nullsLast().op("uuid_ops")),
	index("idx_issues_repository_id").using("btree", table.repositoryId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.repositoryId],
			foreignColumns: [repositories.id],
			name: "issues_repository_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.reporterId],
			foreignColumns: [users.id],
			name: "issues_reporter_id_fkey"
		}).onDelete("restrict"),
	foreignKey({
			columns: [table.assigneeId],
			foreignColumns: [users.id],
			name: "issues_assignee_id_fkey"
		}).onDelete("set null"),
]);

export const posts = pgTable("posts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	content: varchar({ length: 280 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_posts_user_id").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "posts_user_id_fkey"
		}).onDelete("cascade"),
]);

export const likes = pgTable("likes", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	postId: uuid("post_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "likes_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: "likes_post_id_fkey"
		}).onDelete("cascade"),
	unique("likes_user_id_post_id_key").on(table.userId, table.postId),
]);

export const comments = pgTable("comments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	postId: uuid("post_id").notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_comments_post_id").using("btree", table.postId.asc().nullsLast().op("uuid_ops")),
	index("idx_comments_user_id").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comments_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: "comments_post_id_fkey"
		}).onDelete("cascade"),
]);

export const follows = pgTable("follows", {
	followerId: uuid("follower_id").notNull(),
	followeeId: uuid("followee_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_follows_followee_id").using("btree", table.followeeId.asc().nullsLast().op("uuid_ops")),
	index("idx_follows_follower_id").using("btree", table.followerId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.followerId],
			foreignColumns: [users.id],
			name: "follows_follower_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.followeeId],
			foreignColumns: [users.id],
			name: "follows_followee_id_fkey"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.followerId, table.followeeId], name: "follows_pkey"}),
	check("follows_check", sql`follower_id <> followee_id`),
]);
