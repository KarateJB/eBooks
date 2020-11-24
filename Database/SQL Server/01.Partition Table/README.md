
> This is a simple tutorial for creating partitions on an exist table.

## Create a demo table

```sql

CREATE TABLE [dbo].[OnlineTxs]
(
    [Id]       [numeric](18, 0) IDENTITY (1,1) NOT NULL,
    [CardNo]   [varchar](19)                   NOT NULL,
    [Amt]      [decimal](10, 0)                NOT NULL,
    [CreateOn] [datetime]                      NOT NULL,
    CONSTRAINT [PK_OnlineTxs] PRIMARY KEY NONCLUSTERED
    (
        [Id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
)
```


## Create Partition Function and Scheme

```sql
CREATE PARTITION FUNCTION pf_date_range (datetime)
AS RANGE RIGHT
FOR VALUES ('2020/11/23','2020/11/24')
-- FOR VALUES (CONVERT(VARCHAR(10), dateadd(day,-1, GETDATE()), 111)) -- Yesterday
GO

CREATE PARTITION SCHEME ps_date_range
    AS PARTITION pf_date_range ALL TO ([PRIMARY])
GO

-- Verify partitions
SELECT ps.name,pf.name,boundary_id,value
FROM sys.partition_schemes ps
INNER JOIN sys.partition_functions pf ON pf.function_id=ps.function_id
INNER JOIN sys.partition_range_values prf ON pf.function_id=prf.function_id
```