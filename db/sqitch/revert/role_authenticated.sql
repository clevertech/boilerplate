-- Revert boilerplate:role_authenticated from pg

BEGIN;

  drop role authenticated;

COMMIT;
