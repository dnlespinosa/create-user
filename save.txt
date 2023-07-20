\echo 'Delete and recreate new_users db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE new_users;
CREATE DATABASE new_users;
\connect new_users

\i new_users-schema.sql