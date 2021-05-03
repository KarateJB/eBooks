# Merge/Upsert

> Reference: [](https://www.postgresql.org/docs/current/sql-insert.html).

```sql
DO $merge$

    DECLARE
        Id         TEXT = 'FFBD628F-06A8-48C4-A3E8-AD3F7E0EE11E';
        Name       VARCHAR(100) = 'JB';
        Address    VARCHAR(100) = 'yyyyy';
        Phone      VARCHAR(10) = 'xxxxx';
        Birthday   VARCHAR(50) = '1981-05-19 00:00+00';
        EmploymentOn   VARCHAR(20) = '2021-05-01 00:00+00';
    BEGIN
        INSERT INTO "Folks"("Id", "Name", "Birthday", "Address", "Phone", "EmploymentOn")
        VALUES(Id::uuid, Name, Birthday::timestamptz, Address, Phone, EmploymentOn::timestamptz)
	ON CONFLICT ("Id") --Use , to separate multiple conflict columns
        DO UPDATE SET
           "Name" = Name,
           "Birthday" = Birthday::timestamptz,
           "Address" = Address,
           "Phone" = Phone,
           "EmploymentOn" = EmploymentOn::timestamptz;
    END

$merge$
```
