-- Deploy boilerplate:function_signup to pg

BEGIN;

  create or replace function account.signup(
    display_name text, 
    email text, 
    password text
  ) returns account.profile as $$
  declare
    profile account.profile;
  begin
    insert into account.profile (display_name) 
      values (display_name) 
      returning * into profile;
    insert into account_private.credentials (profile_id, email, password) 
      values (profile.id, email, crypt(password, gen_salt('bf', 8)));
    return profile;
  end;
  $$ language plpgsql strict security definer
  set search_path=account_private,account,public;

  comment on function account.signup(text,text,text) is 'Create a new user with a display name, email, and password.';

  grant execute on function account.signup(text,text,text) to anonymous;

COMMIT;
