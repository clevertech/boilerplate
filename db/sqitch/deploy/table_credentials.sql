-- Deploy boilerplate:table_credentials to pg

BEGIN;

  create table account_private.credentials
  (
    profile_id uuid not null constraint credentials_profile_id_fkey references account.profile primary key,
    password text not null,
    email citext not null constraint credentials_email_key unique constraint credentials_email_check check (email ~* '^.+@.+\..+$'::text),
    created_at timestamp without time zone default now() not null,
    updated_at timestamp without time zone default now() not null,
    is_verified boolean default false
  );

  comment on table account_private.credentials is 'An account may optionally have a set of credentials.  If an account does not have credentials, it is a guest account and cannot be accessed once the initial jwt expires.';
  comment on column account_private.credentials.profile_id is 'Every account has a public profile, and so the profile_id is used to identify the account credentials as well.  One set of credentials per profile, enforced by the profile_id being both a foreign key and a primary key.';
  comment on column account_private.credentials.password is 'Secure hash of password.  Used inside authentication procedure.';
  comment on column account_private.credentials.email is 'Emails must be unique and valid.';
  comment on column account_private.credentials.is_verified is 'Email verification flag. Defaults to false -- set to true if the verification token sent to the email was used to verify this account.';
  comment on column account_private.credentials.created_at is 'when this record was inserted into the database.';
  comment on column account_private.credentials.updated_at is 'when this record was last updated.';

COMMIT;
