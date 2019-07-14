-- Deploy boilerplate:role_anonymous to pg

BEGIN;

  create role anonymous;
  grant anonymous to appuser;

COMMIT;
