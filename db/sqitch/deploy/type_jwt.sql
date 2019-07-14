-- Deploy boilerplate:type_jwt to pg

BEGIN;

  create type account.jwt_token as (
    role text,
    profile_id uuid
  );

COMMIT;
