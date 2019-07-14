-- Deploy boilerplate:function_currentProfile to pg

BEGIN;

  create or replace function account.current_profile() 
  returns account.profile as $$
    select * 
    from account.profile p 
    where p.id = nullif(current_setting('jwt.claims.profile_id',true), '')::uuid
  $$ language sql stable;

  comment on function account.current_profile() is 'Get the profile of the user corresponding to the current JWT';

  grant execute on function account.current_profile() to anonymous, authenticated;

COMMIT;
