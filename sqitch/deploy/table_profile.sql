-- Deploy boilerplate:table_profile to pg

BEGIN;

  create table account.profile (
      id uuid default public.uuid_generate_v4() not null primary key,
      display_name text not null,
      created_at timestamp without time zone default now() not null,
      updated_at timestamp without time zone default now() not null,
      constraint name_length check (char_length(display_name) < 80 and char_length(display_name) > 0),
  );

  comment on table account.profile is 'account profiles contain display information for accounts.  every account has one profile.  profiles serve as a central reference point for accounts across datatypes.';
  comment on column account.profile.display_name is 'the public name of the user of the account.  this will show up on the site and is required to be 1-80 characters in length.';
  comment on column account.profile.created_at is 'when this record was inserted into the database';
  comment on column account.profile.updated_at is 'when this record was last updated';


COMMIT;
