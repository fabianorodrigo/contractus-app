-- Role: contractusapp
-- DROP ROLE contractusapp;

CREATE ROLE contractusapp WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
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
