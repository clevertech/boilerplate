-- Deploy boilerplate:table_profile_rbac to pg

BEGIN;

  grant select on table account.profile to authenticated;
  grant delete on table account.profile to authenticated;
  grant update (display_name) on table account.profile to authenticated;

COMMIT;
