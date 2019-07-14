-- Revert boilerplate:function_login from pg

BEGIN;

  drop function account.login;

COMMIT;
