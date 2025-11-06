-- Create a new database named 'gitkundo_db'
-- You would typically run this outside of your application's connection string
-- CREATE DATABASE gitkundo_db;
-- \c gitkundo_db; -- Connect to the newly created database if running in psql

-- Table for users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each user
    username VARCHAR(50) UNIQUE NOT NULL, -- User's unique username
    email VARCHAR(100) UNIQUE NOT NULL, -- User's unique email address
    password_hash VARCHAR(255) NOT NULL, -- Hashed password for security
    bio TEXT, -- User's short biography
    profile_picture_url VARCHAR(255), -- URL to the user's profile picture
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of user creation
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Timestamp of last update
);

-- Index for faster username lookups
CREATE INDEX idx_users_username ON users (username);
-- Index for faster email lookups
CREATE INDEX idx_users_email ON users (email);

-- Table for code repositories (GitHub-like)
CREATE TABLE repositories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each repository
    owner_id UUID NOT NULL, -- Foreign key to the users table (the owner of the repo)
    name VARCHAR(100) NOT NULL, -- Name of the repository
    description TEXT, -- Description of the repository
    visibility VARCHAR(10) NOT NULL DEFAULT 'public', -- 'public' or 'private'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of repository creation
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of last update
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE, -- If user is deleted, their repos are deleted
    UNIQUE (owner_id, name) -- Ensures a user cannot have two repos with the same name
);

-- Index for faster repository lookups by owner and name
CREATE INDEX idx_repositories_owner_name ON repositories (owner_id, name);

-- Table for commits within repositories
CREATE TABLE commits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each commit
    repository_id UUID NOT NULL, -- Foreign key to the repositories table
    committer_id UUID NOT NULL, -- Foreign key to the users table (who made the commit)
    sha VARCHAR(40) UNIQUE NOT NULL, -- SHA-1 hash of the commit (like Git)
    message TEXT, -- Commit message
    committed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of the commit
    FOREIGN KEY (repository_id) REFERENCES repositories(id) ON DELETE CASCADE,
    FOREIGN KEY (committer_id) REFERENCES users(id) ON DELETE RESTRICT -- Do not delete user if they have commits
);

-- Index for faster commit lookups by repository
CREATE INDEX idx_commits_repository_id ON commits (repository_id);
-- Index for faster commit lookups by committer
CREATE INDEX idx_commits_committer_id ON commits (committer_id);

-- Table for branches in repositories
CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each branch
    repository_id UUID NOT NULL, -- Foreign key to the repositories table
    name VARCHAR(100) NOT NULL, -- Name of the branch (e.g., 'main', 'develop', 'feature-x')
    latest_commit_id UUID, -- Foreign key to the commits table (points to the head commit of the branch)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (repository_id) REFERENCES repositories(id) ON DELETE CASCADE,
    FOREIGN KEY (latest_commit_id) REFERENCES commits(id) ON DELETE SET NULL, -- If commit is deleted, set branch's latest_commit_id to null
    UNIQUE (repository_id, name) -- Ensures a repository cannot have two branches with the same name
);

-- Index for faster branch lookups by repository
CREATE INDEX idx_branches_repository_id ON branches (repository_id);

-- Table for issues in repositories (GitHub-like)
CREATE TABLE issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each issue
    repository_id UUID NOT NULL, -- Foreign key to the repositories table
    reporter_id UUID NOT NULL, -- Foreign key to the users table (who created the issue)
    assignee_id UUID, -- Foreign key to the users table (who is assigned to the issue, nullable)
    title VARCHAR(255) NOT NULL, -- Title of the issue
    description TEXT, -- Detailed description of the issue
    status VARCHAR(20) NOT NULL DEFAULT 'open', -- e.g., 'open', 'closed', 'in progress'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (repository_id) REFERENCES repositories(id) ON DELETE CASCADE,
    FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Index for faster issue lookups by repository
CREATE INDEX idx_issues_repository_id ON issues (repository_id);
-- Index for faster issue lookups by reporter
CREATE INDEX idx_issues_reporter_id ON issues (reporter_id);
-- Index for faster issue lookups by assignee
CREATE INDEX idx_issues_assignee_id ON issues (assignee_id);


-- Table for Twitter-like posts (Tweets)
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each post
    user_id UUID NOT NULL, -- Foreign key to the users table (who made the post)
    content VARCHAR(280) NOT NULL, -- The actual text content of the post (max 280 chars like Twitter)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of post creation
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for faster post lookups by user
CREATE INDEX idx_posts_user_id ON posts (user_id);

-- Table for likes on posts
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each like
    user_id UUID NOT NULL, -- Foreign key to the users table (who liked the post)
    post_id UUID NOT NULL, -- Foreign key to the posts table (which post was liked)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE (user_id, post_id) -- Ensures a user can only like a post once
);

-- Table for comments on posts
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each comment
    user_id UUID NOT NULL, -- Foreign key to the users table (who made the comment)
    post_id UUID NOT NULL, -- Foreign key to the posts table (which post was commented on)
    content TEXT NOT NULL, -- The content of the comment
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Index for faster comment lookups by post
CREATE INDEX idx_comments_post_id ON comments (post_id);
-- Index for faster comment lookups by user
CREATE INDEX idx_comments_user_id ON comments (user_id);

-- Table for users following other users (Twitter-like)
CREATE TABLE follows (
    follower_id UUID NOT NULL, -- Foreign key to the users table (who is following)
    followee_id UUID NOT NULL, -- Foreign key to the users table (who is being followed)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, followee_id), -- Composite primary key to ensure unique follow relationship
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followee_id) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (follower_id <> followee_id) -- A user cannot follow themselves
);

-- Index for faster lookups of who a user follows
CREATE INDEX idx_follows_follower_id ON follows (follower_id);
-- Index for faster lookups of who is following a user
CREATE INDEX idx_follows_followee_id ON follows (followee_id);

-- Optional: Function to update 'updated_at' columns automatically
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Optional: Triggers to call the update_timestamp function
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECURE FUNCTION update_timestamp();

CREATE TRIGGER update_repositories_updated_at
BEFORE UPDATE ON repositories
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_issues_updated_at
BEFORE UPDATE ON issues
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
