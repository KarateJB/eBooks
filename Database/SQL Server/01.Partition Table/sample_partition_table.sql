/* Create table */

CREATE TABLE [dbo].[OnlineTxs]
(
    [Id]       [numeric](18, 0) IDENTITY (1,1) NOT NULL,
    [CardNo]   [varchar](19)                   NOT NULL,
    [Amt]      [decimal](10, 0)                NOT NULL,
    [CreateOn] [datetime]                      NOT NULL,
    CONSTRAINT [PK_OnlineTxs]
    (
        [Id]
        ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
)


/* Create partition function and schema */

CREATE PARTITION FUNCTION PF_DATE_RANGE (datetime)
AS RANGE RIGHT
FOR VALUES ('2020/11/23','2020/11/24')
-- FOR VALUES (CONVERT(VARCHAR(10), dateadd(day,-1, GETDATE()), 111)) -- Yesterday
GO

CREATE PARTITION SCHEME PS_DATE_RANGE
    AS PARTITION PF_DATE_RANGE ALL TO ([PRIMARY])
GO

-- Verify partitions
SELECT ps.name,pf.name,boundary_id,value
FROM sys.partition_schemes ps
INNER JOIN sys.partition_functions pf ON pf.function_id=ps.function_id
INNER JOIN sys.partition_range_values prf ON pf.function_id=prf.function_id


/* Recreate constraints */

ALTER TABLE [dbo].[OnlineTxs] DROP CONSTRAINT [PK_OnlineTxs]
GO

ALTER TABLE [dbo].[OnlineTxs]
ADD CONSTRAINT [PK_OnlineTxs] PRIMARY KEY NONCLUSTERED ([Id] ASC, [CreateOn])

-- Create cluster index
CREATE CLUSTERED INDEX [IX_OnlineTxs_CreateOn] ON [dbo].[OnlineTxs] ([CreateOn])
    WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON PS_DATE_RANGE(CreateOn)
GO

DROP PROCEDURE [dbo].[sp_clean_onlinetxs];
GO

CREATE PROCEDURE [dbo].[sp_clean_onlinetxs]
@DELETE_TO DATETIME
AS

DECLARE @P_ID INT;
DECLARE @P_RANGE DATETIME;

IF (@DELETE_TO IS NULL)
    BEGIN
        SET @DELETE_TO = CONVERT(DATETIME, CONVERT(VARCHAR(10), dateadd(day,-2, GETDATE()), 111))
    END

-- Get Partion Id and range from CTE
;WITH PartitionInfo AS (
    SELECT TOP 1
        sprv.value AS [RANGE],
        sprv.boundary_id AS [ID]
    FROM sys.partition_functions AS spf
             INNER JOIN sys.partition_range_values sprv
                        ON sprv.function_id=spf.function_id
    WHERE
            spf.name=N'PF_DATE_RANGE'
      AND CONVERT(DATE, sprv.value) = CONVERT(DATE, @DELETE_TO)
) SELECT @P_ID = [ID], @P_RANGE = CONVERT(DATETIME, [RANGE]) FROM PartitionInfo;

IF (@P_ID IS NOT NULL)
    BEGIN
        -- Truncate Partition
        TRUNCATE TABLE [dbo].[OnlineTxs] WITH (PARTITIONS(@P_ID));

        -- Delete Partition
        ALTER PARTITION FUNCTION PF_TID_DATE_RANGE() MERGE RANGE(@P_RANGE);

        -- Create new partition with the range as current date
        DECLARE @NEW_P_BOUNDARY VARCHAR(10);
        SET @NEW_P_BOUNDARY = CONVERT(VARCHAR(10), GETDATE(), 111);
        ALTER PARTITION SCHEME PS_DATE_RANGE NEXT USED [PRIMARY];
        ALTER PARTITION FUNCTION PF_DATE_RANGE() SPLIT RANGE (@NEW_P_BOUNDARY);
    END
GO

/* For testing */

-- Create a function to get the random number
CREATE FUNCTION fn_get_random (@GUID uniqueidentifier, @CEILING_VALUE INT)
RETURNS INT
AS
BEGIN
  DECLARE @RAND INT;
  SELECT @RAND = ABS(CHECKSUM(@GUID)) % @CEILING_VALUE;
  RETURN @RAND;
END


-- Create mock data
WITH
DECLARE @seq int = 0
WHILE @seq < 1000
BEGIN
    SET @seq = @seq + 1

    INSERT INTO [dbo].[OnlineTxs]([Cardno],[Amt],[CreateOn])
    SELECT '123456****789' AS [CardNo], fn_get_random(NEWID(), 9999) AS [Amt], fn_get_random(NEWID(), 3)
END
