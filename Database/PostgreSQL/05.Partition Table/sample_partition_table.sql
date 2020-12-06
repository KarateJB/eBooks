/* Create table */
CREATE TABLE "OnlineTxs"
(
    "Id"       serial NOT NULL,
    "CardNo"   varchar(19) NOT NULL,
    "Amt"      decimal(10, 0) NOT NULL,
    "CreateOn" timestamp NOT NULL
) PARTITION BY RANGE ("CreateOn"); -- Add more columns for partitioning

/* Create Partitions */
CREATE TABLE "OnlineTxs_20201127" PARTITION OF "OnlineTxs"
    FOR VALUES FROM ('2020-11-26') TO ('2020-11-27');

CREATE TABLE "OnlineTxs_20201128" PARTITION OF "OnlineTxs"
    FOR VALUES FROM ('2020-11-27') TO ('2020-11-28');

/* Check the Partitions */

-- Show the details of partitions
SELECT
    nmsp_parent.nspname AS parent_schema,
    parent.relname      AS parent,
    nmsp_child.nspname  AS child_schema,
    child.relname       AS child_name,
    pg_get_expr(child.relpartbound, child.oid, true) as partition_expression
FROM pg_inherits
    JOIN pg_class AS parent            ON pg_inherits.inhparent = parent.oid
    JOIN pg_class AS child             ON pg_inherits.inhrelid   = child.oid
    JOIN pg_namespace AS nmsp_parent   ON nmsp_parent.oid  = parent.relnamespace
    JOIN pg_namespace AS nmsp_child    ON nmsp_child.oid   = child.relnamespace
WHERE parent.relname='OnlineTxs';


-- Show the number of partitions
SELECT
    nmsp_parent.nspname     AS parent_schema,
    parent.relname          AS parent,
    COUNT(*)
FROM pg_inherits
    JOIN pg_class parent        ON pg_inherits.inhparent = parent.oid
    JOIN pg_class child     ON pg_inherits.inhrelid   = child.oid
    JOIN pg_namespace nmsp_parent   ON nmsp_parent.oid  = parent.relnamespace
    JOIN pg_namespace nmsp_child    ON nmsp_child.oid   = child.relnamespace
GROUP BY parent_schema, parent;


/* Add constraints */
-- Add Primary key
ALTER TABLE public."OnlineTxs" ADD PRIMARY KEY ("Id", "CreateOn");

-- (Optional) Add index on "CreateOn"
CREATE INDEX IX_OnlineTxs_CreateOn ON public."OnlineTxs"
(
    "CreateOn" ASC
);


/* Manage Partitions */

-- Remove a Partition
ALTER TABLE public."OnlineTxs" DROP PARTITION "OnlineTxs_20201127";
-- Or
DROP TABLE "OnlineTxs_20201126";


-- Detach a Partition as a table
ALTER TABLE public."OnlineTxs" DETACH PARTITION "OnlineTxs_20201127";


-- Attach a detachd partition table
ALTER TABLE "OnlineTxs" ATTACH PARTITION "OnlineTxs_20201126"
FOR VALUES FROM ('2020-11-25') TO ('2020-11-26');



/* For testing */

-- Get a random integer between low and high (low <= the random interger <= high)
CREATE OR REPLACE FUNCTION fn_random_int(low INT, high INT) 
   RETURNS INT AS
$$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END;
$$ language 'plpgsql' STRICT;

-- Create mock data
do $loop$
declare r INT;
begin
for r in 1..1000 loop
    INSERT INTO public."OnlineTxs"("CardNo","Amt","CreateOn")
    SELECT
    '123456****789' AS "CardNo",
    fn_random_int(100,9999) AS "Amt",
    NOW() + fn_random_int(0,4) * interval '-1' day as "CreateOn";
end loop;
end;
$loop$;


/* Verification */

-- First do VACUUM ANALYZE
VACUUM ANALYZE

-- Check count from "pg_stat_user_tabls"
SELECT schemaname, relname, n_live_tup as Cnt
FROM pg_stat_user_tables
WHERE relname LIKE '%OnlineTxs%'
ORDER BY relname;

-- Or check count from "pg_inherits"
SELECT
    nmsp_parent.nspname AS parent_schema,
    parent.relname      AS parent,
    nmsp_child.nspname  AS child_schema,
    child.relname       AS child_name,
    pg_get_expr(child.relpartbound, child.oid, true) as partition_expression,
    SUM(child.reltuples)    AS cnt
FROM pg_inherits
     JOIN pg_class AS parent            ON pg_inherits.inhparent = parent.oid
     JOIN pg_class AS child             ON pg_inherits.inhrelid   = child.oid
     JOIN pg_namespace AS nmsp_parent   ON nmsp_parent.oid  = parent.relnamespace
     JOIN pg_namespace AS nmsp_child    ON nmsp_child.oid   = child.relnamespace
WHERE parent.relname='OnlineTxs'
GROUP BY parent_schema, parent, child_schema, child_name, partition_expression
