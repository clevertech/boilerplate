-- Revert boilerplate:type_jwt from pg

BEGIN;

  drop type account.jwt_token cascade;

COMMIT;
