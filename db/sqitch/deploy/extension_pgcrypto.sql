-- Deploy boilerplate:extension_pgcrypto to pg

BEGIN;

  create extension if not exists "pgcrypto" with schema public;

COMMIT;
