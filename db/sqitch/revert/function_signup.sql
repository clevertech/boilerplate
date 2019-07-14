-- Revert boilerplate:function_signup from pg

BEGIN;

  drop function account.signup(text,text,text);

COMMIT;
