-- Deploy boilerplate:function_login to pg

BEGIN;

  create or replace function account.login(_email text, _password text)
  returns account.jwt_token as $$
  declare
    credentials account_private.credentials;
  begin
    select c.* into credentials from account_private.credentials as c where email = _email;

    if credentials.password = crypt(_password, credentials.password) then
      return ('authenticated', credentials.profile_id)::account.jwt_token;
    else
      return null;
    end if;
  end;
  $$ language plpgsql strict security definer
  set search_path=account_private,account,public;

  comment on function account.login(text,text) is 'Given an email and password, get a JWT for the corresponding user with role=''authenticated''';

  grant execute on function account.login(text,text) to anonymous, authenticated;
  

COMMIT;
