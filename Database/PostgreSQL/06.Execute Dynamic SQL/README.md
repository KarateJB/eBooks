> This is a sample of using [EXECUTE](https://www.postgresql.org/docs/current/ecpg-dynamic.html) to execute the dynamic SQL, which its parameters come from psql arguments.


## The origin SQL

Here is the original SQL we want to execute.
The SQL will create a foreign data wrapper for [dblink(cross database query)](https://karatejb.blogspot.com/2019/04/postgresql-cross-database-query-with.html) from database `Demo` to database `postgres`.



- create_dblink_wrapper.sql

```sql
/* Create dblink wrapper to postgres */

DO $wrapper$
BEGIN

CREATE FOREIGN DATA WRAPPER pgagent_wrapper VALIDATOR postgresql_fdw_validator;
CREATE SERVER db_postgres FOREIGN DATA WRAPPER pgagent_wrapper OPTIONS (host 'localhost', dbname 'postgres' );
CREATE USER MAPPING FOR postgres SERVER db_postgres OPTIONS (user 'postgres', password 'xxxxx');

END
$wrapper$;
```



## Goals

**Since we put the user/pwd when creating the USER MAPPING and while executing the SQL on CI, it is insecure and cannot be modified depends on different environments.**

We would like to decide the values of user/pwd by the environment variables, for example,


```s
$ psql -h localhost -p 5432 -U postgres -d Demo -v postgres_user=$POSTGRESS_USER -v postgres_password=$POSTGRES_PASSWORD -f create_dblink_wrapper.sql
```




## This wiil NOT WORK!

Since we can get the argument values from psql command by `:postgres_user`. However, we cannot use the variable(s) inside the `DO` statement.

```sql
\echo USER/PWD=:postgres_user/:postgres_password -- This wiil successfully show USER/PWD=my_user/my_pwd

DO $wrapper$
CREATE USER MAPPING FOR postgres SERVER db_postgres OPTIONS (user :'postgres_user', password :'postgres_password'); --Error: syntax error on ":"
END
$wrapper$
```


## Solution

We have to use the features of [Dynamic SQL]( https://www.postgresql.org/docs/current/ecpg-dynamic.html) and use [current_setting(get current value of setting)]( https://www.postgresql.org/docs/9.6/functions-admin.html#FUNCTIONS-ADMIN-SET-TABLE) to make the SQL can read the value of arguments in `DO` statement.


- create_dblink_wrapper.sql

```sql
/* Create dblink wrapper to postgres */

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

CREATE FOREIGN DATA WRAPPER pgagent_wrapper VALIDATOR postgresql_fdw_validator;
CREATE SERVER db_postgres FOREIGN DATA WRAPPER pgagent_wrapper OPTIONS (host 'localhost', dbname 'postgres' );
--Execute Dynamic SQL
EXECUTE format('CREATE USER MAPPING FOR postgres SERVER db_postgres OPTIONS (user ''%I'', password ''%I'');', usr, pwd);

END
$wrapper$

```


Now we can execute the SQL as following,

```s
$ psql -h localhost -p 5432 -U postgres -d Demo -v postgres_user=$POSTGRES_USER -v postgres_password=$POSTGRES_PASSWORD -f create_dblink_wrapper.sql
```

Output:

```s
POSTGRES_USER='postgres',POSTGRES_PASSWORD='xxxxx'
SET
SET
 pg.user
----------
 postgres
(1 row)

  pg.pwd
-----------
 xxxxx
(1 row)

DO
```


## Reference

- [PostgreSQL Doc - psql](https://www.postgresql.org/docs/current/app-psql.html)
- [PostgreSQL Doc - Dynamic SQL](https://www.postgresql.org/docs/current/ecpg-dynamic.html)
- [PSQL Command Line Arguments in DO script](https://stackoverflow.com/a/38175213/7045253)
- [PostgreSQL: How to pass parameters from command line?](https://stackoverflow.com/a/7389606/7045253)


