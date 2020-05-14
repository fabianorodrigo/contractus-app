-- Role: contractusapp
-- DROP ROLE contractusapp;

CREATE ROLE contractusapp WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  CREATEDB
  NOCREATEROLE
  NOREPLICATION
  ENCRYPTED PASSWORD 'md5c2d0400437978bd6ad3ca700ae2b91c6';


-- Database: contractusapp

-- DROP DATABASE contractusapp;

CREATE DATABASE contractusapp
    WITH
    OWNER = contractusapp
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\l -- SHOW DATABASES

\c contractusapp -- USE DATABASE

SELECT nspname FROM pg_catalog.pg_namespace; -- SHOW SCHEMAS
select * from information_schema.tables where table_schema = 'contractusapp'; --tables of schema
