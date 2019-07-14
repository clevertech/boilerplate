-- Deploy boilerplate:extension_uuidOssp to pg

BEGIN;

  create extension if not exists "uuid-ossp" with schema public;

COMMIT;
