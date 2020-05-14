GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES
    ON ALL TABLES IN SCHEMA contractusapp TO contractusapp;

GRANT SELECT,  UPDATE
    ON ALL SEQUENCES IN SCHEMA contractusapp TO contractusapp;

ALTER SCHEMA contractusapp OWNER TO contractusapp;
