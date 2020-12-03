
## By re-create schema

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL tables IN SCHEMA system TO postgres;
GRANT ALL PRIVILEGES ON ALL sequences IN SCHEMA system TO postgres;
GRANT ALL PRIVILEGES ON ALL functions IN SCHEMA system TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA system GRANT ALL ON tables to postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA system GRANT ALL ON sequences to postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA system GRANT ALL ON functions to postgres;
```


## By output the drop sql and execute them

```sql
SELECT
    'DROP TABLE IF EXISTS ' || schemaname || '."' || tablename || '" CASCADE;'
FROM pg_tables
WHERE schemaname IN ('public');
```
