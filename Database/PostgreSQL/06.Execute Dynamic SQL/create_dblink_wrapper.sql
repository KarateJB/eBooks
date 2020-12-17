/* Create dblink wrapper to postgres */

/* Use the following command to execute it. */
/* psql -h localhost -p 5432 -U postgres -d <DB name> -v postgres_user=$POSTGRESS_USER -v postgres_password=$POSTGTRESS_PASSWORD -f create_dblink_wrapper.sql */

\echo POSTGRES_USER=:'postgres_user',POSTGRES_PASSWORD=:'postgres_password'

SET "pg.user" TO :'postgres_user'; --The variable must contains dot. If name it as "pg_user", it will cause error: "ERROR:  unrecognized configuration parameter "pg_user".
SET "pg.pwd" TO :'postgres_password';
SHOW "pg.user";
SHOW "pg.pwd";

DO $wrapper$
DECLARE
  usr text := current_setting('pg.user');
  pwd text := current_setting('pg.pwd');
BEGIN

-- Declare statement
CREATE FOREIGN DATA WRAPPER pgagent_wrapper VALIDATOR postgresql_fdw_validator;
CREATE SERVER db_postgres FOREIGN DATA WRAPPER pgagent_wrapper OPTIONS (host 'localhost', dbname 'postgres' );
EXECUTE format('CREATE USER MAPPING FOR postgres SERVER db_postgres OPTIONS (user ''%I'', password ''%I'');', usr, pwd);

END
$wrapper$