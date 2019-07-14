-- Deploy boilerplate:table_profile_rls to pg

BEGIN;

  alter table account.profile enable row level security;
  create policy select_profile on account.profile for select to authenticated 
    using (id = nullif(current_setting('jwt.claims.profile_id', true), '')::uuid);
  create policy update_profile on account.profile for update to authenticated
    using (id = nullif(current_setting('jwt.claims.profile_id', true), '')::uuid);
  create policy delete_profile on account.profile for delete to authenticated
    using (id = nullif(current_setting('jwt.claims.profile_id', true), '')::uuid);

COMMIT;
