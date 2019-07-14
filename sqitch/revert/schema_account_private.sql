-- Revert boilerplate:schema_account_private from pg

BEGIN;

  drop schema account_private cascade;

COMMIT;
