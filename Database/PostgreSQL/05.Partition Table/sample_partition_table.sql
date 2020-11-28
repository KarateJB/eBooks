/* Create table */
CREATE TABLE "OnlineTxs"
(
    "Id"       serial NOT NULL,
    "CardNo"   varchar(19) NOT NULL,
    "Amt"      decimal(10, 0) NOT NULL,
    "CreateOn" timestamp NOT NULL
) PARTITION BY RANGE ("CreateOn");


CREATE TABLE "OnlineTxs_20201127" PARTITION OF "OnlineTxs"
    FOR VALUES FROM ('2020-11-26') TO ('2020-11-27');

CREATE TABLE "OnlineTxs_20201128" PARTITION OF "OnlineTxs"
    FOR VALUES FROM ('2020-11-27') TO ('2020-11-28');


