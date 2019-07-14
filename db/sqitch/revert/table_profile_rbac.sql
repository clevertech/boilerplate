-- Revert boilerplate:table_profile_rbac from pg

BEGIN;

  revoke select on table account.profile from authenticated;
  revoke delete on table account.profile from authenticated;
  revoke update (display_name) on table account.profile from authenticated;

COMMIT;
