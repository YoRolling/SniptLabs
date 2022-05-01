-- for sqlite3
-- create table for snippets folder 
create table if not exists snippets (
  id integer primary key autoincrement,
  name text,
  content text,
  folerId integer,
  tsId integer,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp,
  deprecated integer default 0
);
create index if not exists idx_snippets_name on snippets (name);
create index if not exists idx_snippets_content on snippets (content);
create index if not exists idx_snippets_created_at on snippets (created_at);
create table if not exists folder (
  id integer primary key autoincrement,
  name text,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp,
  deprecated integer default 0
);
INSERT INTO folder(name) VALUES ('默认文件夹');

create table if not exists tags (
  id integer primary key autoincrement,
  name text,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp,
  deprecated integer default 0
);

CREATE table if not exists tag_snippet (
  id integer primary key autoincrement,
  tagId integer,
  snippetId integer,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp
);