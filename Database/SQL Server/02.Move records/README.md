### Move records from table TableA to TableB

```sql
INSERT [dbo].[TableB] SELECT
[A],[B],[C]
FROM    (
    DELETE [dbo].[TableB]
    OUTPUT
            DELETED.*
    WHERE [C] = 'xxx'
) AS RowsToMove ;
```
