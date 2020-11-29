/* Create table */
CREATE TABLE "OnlineTxs"
(
    "Id"       serial NOT NULL,
    "CardNo"   varchar(19) NOT NULL,
    "Amt"      decimal(10, 0) NOT NULL,
    "CreateOn" timestamp NOT NULL
) PARTITION BY RANGE ("CreateOn");

/* Create Partitions */
CREATE TABLE "OnlineTxs_20201127" PARTITION OF "OnlineTxs"
    FOR VALUES FROM ('2020-11-26') TO ('2020-11-27');

CREATE TABLE "OnlineTxs_20201128" PARTITION OF "OnlineTxs"
    FOR VALUES FROM ('2020-11-27') TO ('2020-11-28');

/* Add constraints */
-- Add Primary key
ALTER TABLE public."OnlineTxs" ADD PRIMARY KEY ("Id", "CreateOn");

-- (Optional) Add index on "CreateOn"
CREATE INDEX IX_OnlineTxs_CreateOn ON public."OnlineTxs"
(
    "CreateOn" ASC
);

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

