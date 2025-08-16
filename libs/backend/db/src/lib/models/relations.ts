import { relations } from "drizzle-orm/relations";
import { users, repositories, commits, branches, issues, posts, likes, comments, follows } from "./schema";

export const repositoriesRelations = relations(repositories, ({one, many}) => ({
	user: one(users, {
		fields: [repositories.ownerId],
		references: [users.id]
	}),
	commits: many(commits),
	branches: many(branches),
	issues: many(issues),
}));

export const usersRelations = relations(users, ({many}) => ({
	repositories: many(repositories),
	commits: many(commits),
	issues_reporterId: many(issues, {
		relationName: "issues_reporterId_users_id"
	}),
	issues_assigneeId: many(issues, {
		relationName: "issues_assigneeId_users_id"
	}),
	posts: many(posts),
	likes: many(likes),
	comments: many(comments),
	follows_followerId: many(follows, {
		relationName: "follows_followerId_users_id"
	}),
	follows_followeeId: many(follows, {
		relationName: "follows_followeeId_users_id"
	}),
}));

export const commitsRelations = relations(commits, ({one, many}) => ({
	repository: one(repositories, {
		fields: [commits.repositoryId],
		references: [repositories.id]
	}),
	user: one(users, {
		fields: [commits.committerId],
		references: [users.id]
	}),
	branches: many(branches),
}));

export const branchesRelations = relations(branches, ({one}) => ({
	repository: one(repositories, {
		fields: [branches.repositoryId],
		references: [repositories.id]
	}),
	commit: one(commits, {
		fields: [branches.latestCommitId],
		references: [commits.id]
	}),
}));

export const issuesRelations = relations(issues, ({one}) => ({
	repository: one(repositories, {
		fields: [issues.repositoryId],
		references: [repositories.id]
	}),
	user_reporterId: one(users, {
		fields: [issues.reporterId],
		references: [users.id],
		relationName: "issues_reporterId_users_id"
	}),
	user_assigneeId: one(users, {
		fields: [issues.assigneeId],
		references: [users.id],
		relationName: "issues_assigneeId_users_id"
	}),
}));

export const postsRelations = relations(posts, ({one, many}) => ({
	user: one(users, {
		fields: [posts.userId],
		references: [users.id]
	}),
	likes: many(likes),
	comments: many(comments),
}));

export const likesRelations = relations(likes, ({one}) => ({
	user: one(users, {
		fields: [likes.userId],
		references: [users.id]
	}),
	post: one(posts, {
		fields: [likes.postId],
		references: [posts.id]
	}),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	user: one(users, {
		fields: [comments.userId],
		references: [users.id]
	}),
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id]
	}),
}));

export const followsRelations = relations(follows, ({one}) => ({
	user_followerId: one(users, {
		fields: [follows.followerId],
		references: [users.id],
		relationName: "follows_followerId_users_id"
	}),
	user_followeeId: one(users, {
		fields: [follows.followeeId],
		references: [users.id],
		relationName: "follows_followeeId_users_id"
	}),
}));