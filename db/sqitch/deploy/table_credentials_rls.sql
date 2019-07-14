-- Deploy boilerplate:table_credentials_rls to pg

BEGIN;

  alter table account_private.credentials enable row level security;

COMMIT;
