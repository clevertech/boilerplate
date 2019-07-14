-- Deploy boilerplate:privileges to pg

BEGIN;

  alter default privileges revoke execute on functions from public;

COMMIT;
