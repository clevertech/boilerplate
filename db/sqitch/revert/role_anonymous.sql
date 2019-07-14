-- Revert boilerplate:role_anonymous from pg

BEGIN;

  drop role anonymous;

COMMIT;
