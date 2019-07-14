-- Deploy boilerplate:function_set_updated_at to pg

BEGIN;

  create or replace function utils.set_updated_at() returns trigger as $$
  begin
    new.updated_at := current_timestamp;
    return new;
  end
  $$ language plpgsql;

  comment on function utils.set_updated_at() is 'A utility function used in triggers to set the updated_at column in tables';

COMMIT;
