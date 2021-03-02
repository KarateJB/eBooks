
```sql
SELECT nspname || '.' || relname AS "Relation",
    pg_size_pretty(pg_total_relation_size(C.oid)) AS "TotalSize"
  FROM pg_class C
  LEFT JOIN pg_namespace N ON (N.oid = C.relnamespace)
  WHERE nspname NOT IN ('pg_catalog', 'information_schema')
    AND C.relkind <> 'i'
    AND nspname !~ '^pg_toast'
  ORDER BY pg_total_relation_size(C.oid) DESC
  LIMIT 5;
```

Result:

| Relation | TotalSize |
|:---------|:---------:|
| public.XXX | 74 MB |
| public.YYY | 100 MB |
| public.ZZZ | 31 MB |
| public.WWW | 32 MB |
| public.TTT | 33 MB |