-- Deploy boilerplate:table_credentials_triggers.sql to pg

BEGIN;

  create trigger credentials_updated_at before update on account_private.credentials
    for each row execute procedure utils.set_updated_at();

COMMIT;
