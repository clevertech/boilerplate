-- Revert boilerplate:table_credentials_rls from pg

BEGIN;

  alter table account_private.credentials disable row level security;

COMMIT;
