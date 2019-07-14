-- Revert boilerplate:schema_utils from pg

BEGIN;

  drop schema utils cascade;

COMMIT;
