-- Revert boilerplate:privileges from pg

BEGIN;

  alter default privileges grant execute on functions to public;

COMMIT;
