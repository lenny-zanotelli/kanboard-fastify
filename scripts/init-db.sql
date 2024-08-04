DROP TABLE IF EXISTS "card_has_tag";
DROP TABLE IF EXISTS "tag";
DROP TABLE IF EXISTS "list";
DROP TABLE IF EXISTS "card";
DROP TABLE IF EXISTS "user";

-- USER

CREATE TABLE IF NOT EXISTS "user" (
  "id" SERIAL PRIMARY KEY,
  "avatar" VARCHAR,
  "firstname" VARCHAR NOT NULL,
  "lastname" VARCHAR NOT NULL,
  "email" VARCHAR NOT NULL,
  "password" VARCHAR NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- LIST

CREATE TABLE IF NOT EXISTS "list" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "order" VARCHAR NOT NULL,
  "description" VARCHAR,
  "user_id" INT NOT NULL,
  FOREIGN KEY("user_id") REFERENCES "user"("id"),
  "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- CARD

CREATE TABLE IF NOT EXISTS "card" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "order" VARCHAR NOT NULL,
  "color" VARCHAR DEFAULT '#ffffff',
  "description" VARCHAR,
  "user_id" INT NOT NULL,
  "list_id" INT NOT NULL,
  FOREIGN KEY("user_id") REFERENCES "user"("id"),
  FOREIGN KEY("list_id") REFERENCES "list"("id"),
  "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL
); 

-- TAG

CREATE TABLE IF NOT EXISTS "tag" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
  "color" VARCHAR DEFAULT '#ffffff',
  "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- CARD HAS TAG

CREATE TABLE IF NOT EXISTS "card_has_tag" (
  "id" SERIAL PRIMARY KEY,
  "card_id" INT NOT NULL,
  "tag_id" INT NOT NULL,
  FOREIGN KEY("card_id") REFERENCES "card"("id"),
  FOREIGN KEY("tag_id") REFERENCES "tag"("id"),
  "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);