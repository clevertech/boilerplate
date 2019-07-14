-- Revert boilerplate:table_credentials_triggers.sql from pg

BEGIN;

  drop trigger credentials_updated_at;

COMMIT;
