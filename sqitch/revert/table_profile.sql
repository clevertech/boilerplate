-- Revert boilerplate:table_profile from pg

BEGIN;

  drop table account.profile cascade;

COMMIT;
