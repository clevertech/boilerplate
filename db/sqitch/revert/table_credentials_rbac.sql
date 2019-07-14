-- Revert boilerplate:table_credentials_rbac from pg

BEGIN;

  -- no RBAC policies granted on credentials table

COMMIT;
