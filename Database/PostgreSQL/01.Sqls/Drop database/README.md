# Drop Database

### By SQL

```sql
DROP DATABASE [ IF EXISTS ] {dbname}
```

### By command

```s
$ su postgres # optional 
$ dropdb {dbname}
```

See help by `dropdb -?` or `dropdb --help`.
Reference: [Official document](https://www.postgresql.org/docs/9.3/app-dropdb.html).




# Force Drop Database

```sql
UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'my_table_name';
ALTER DATABASE "my_table_name" CONNECTION LIMIT 1;

SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'my_table_name';

DROP DATABASE  "my_table_name"
```