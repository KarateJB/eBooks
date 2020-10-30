### See current sessions

```sql
SELECT query, state, backend_start, state_change, client_addr  FROM pg_stat_activity
```


### Count all sessions

```sql
SELECT sum(numbackends) FROM pg_stat_database;
```