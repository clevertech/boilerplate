-- Deploy boilerplate:schema_account to pg

BEGIN;

  create schema account;
  grant usage on schema account to anonymous, authenticated;

COMMIT;
