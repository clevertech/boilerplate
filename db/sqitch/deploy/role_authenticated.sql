-- Deploy boilerplate:role_authenticated to pg

BEGIN;

  create role authenticated;
  grant authenticated to appuser;

COMMIT;
