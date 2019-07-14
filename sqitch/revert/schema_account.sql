-- Revert boilerplate:schema_account from pg

BEGIN;

  drop schema account cascade;

COMMIT;
