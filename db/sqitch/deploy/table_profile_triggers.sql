-- Deploy boilerplate:table_profile_triggers.sql to pg

BEGIN;

  create trigger profile_updated_at before update on account.profile
    for each row execute procedure utils.set_updated_at();

COMMIT;
