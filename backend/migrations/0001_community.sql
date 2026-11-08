PRAGMA foreign_keys = ON;
CREATE TABLE profiles (id TEXT PRIMARY KEY, display_name TEXT NOT NULL DEFAULT 'Visitor', bio TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL);
CREATE TABLE posts (id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, excerpt TEXT NOT NULL DEFAULT '', body TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published')), published_at TEXT, updated_at TEXT NOT NULL);
CREATE TABLE comments (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES profiles(id), target TEXT NOT NULL, body TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')), created_at TEXT NOT NULL);
CREATE INDEX comments_target_status ON comments(target,status,created_at);
CREATE TABLE likes (user_id TEXT NOT NULL REFERENCES profiles(id), target TEXT NOT NULL, PRIMARY KEY(user_id,target));
CREATE TABLE bookmarks (user_id TEXT NOT NULL REFERENCES profiles(id), target TEXT NOT NULL, created_at TEXT NOT NULL, PRIMARY KEY(user_id,target));
CREATE TABLE view_events (visitor_hash TEXT NOT NULL, target TEXT NOT NULL, day TEXT NOT NULL, PRIMARY KEY(visitor_hash,target,day));
CREATE TABLE view_totals (target TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0);
CREATE TRIGGER count_view AFTER INSERT ON view_events BEGIN INSERT INTO view_totals(target,count) VALUES(NEW.target,1) ON CONFLICT(target) DO UPDATE SET count=count+1; END;
CREATE TABLE rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX rate_expiry ON rate_limits(expires_at);
-- Retain old slugs as private tombstones after rename, so old comment targets cannot reopen.
CREATE TABLE post_targets (target TEXT PRIMARY KEY, post_id TEXT NOT NULL REFERENCES posts(id), status TEXT NOT NULL CHECK(status IN ('draft','published')));
CREATE TRIGGER register_post_target AFTER INSERT ON posts BEGIN
  INSERT INTO post_targets(target,post_id,status) VALUES('post:' || NEW.slug,NEW.id,NEW.status);
END;
CREATE TRIGGER update_post_target AFTER UPDATE OF slug,status ON posts BEGIN
  UPDATE post_targets SET status='draft' WHERE post_id=NEW.id;
  INSERT INTO post_targets(target,post_id,status) VALUES('post:' || NEW.slug,NEW.id,NEW.status) ON CONFLICT(target) DO UPDATE SET status=NEW.status WHERE post_id=NEW.id;
END;
CREATE TRIGGER reserve_post_slug BEFORE INSERT ON posts WHEN EXISTS(SELECT 1 FROM post_targets WHERE target='post:' || NEW.slug AND post_id<>NEW.id) BEGIN SELECT RAISE(ABORT,'reserved_slug'); END;
CREATE TRIGGER reserve_updated_slug BEFORE UPDATE OF slug ON posts WHEN EXISTS(SELECT 1 FROM post_targets WHERE target='post:' || NEW.slug AND post_id<>NEW.id) BEGIN SELECT RAISE(ABORT,'reserved_slug'); END;
