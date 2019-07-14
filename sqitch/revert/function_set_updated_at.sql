-- Revert boilerplate:function_set_updated_at from pg

BEGIN;

  drop function utils.set_updated_at() cascade;

COMMIT;
