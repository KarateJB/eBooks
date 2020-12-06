/* Create table */

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


/* Create partition function and scheme */

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

-- To remove partition scheme and function
-- DROP PARTITION SCHEME ps_date_range;
-- DROP PARTITION FUNCTION pf_date_range;

/* Recreate constraints */
ALTER TABLE [dbo].[OnlineTxs] DROP CONSTRAINT [PK_OnlineTxs]
GO

ALTER TABLE [dbo].[OnlineTxs]
    ADD CONSTRAINT [PK_OnlineTxs] PRIMARY KEY NONCLUSTERED ([Id] ASC, [CreateOn])
	ON ps_date_range([CreateOn]);
GO

-- Create cluster index
CREATE CLUSTERED INDEX [IX_OnlineTxs_createon] ON [dbo].[OnlineTxs] ([CreateOn])
WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
ON ps_date_range([CreateOn])
GO


/* Create the stored procedure to truncate and delete partition */
-- DROP PROCEDURE [dbo].[sp_clean_onlinetxs];
-- GO

-- EXEC [dbo].[sp_clean_onlinetxs] '2020-11-22 00:00:00';
CREATE PROCEDURE [dbo].[sp_clean_onlinetxs]
@DELETE_TO DATETIME
AS

DECLARE @BOUNDARY_ID INT;
DECLARE @BOUNDARY_VALUE DATETIME;

IF (@DELETE_TO IS NULL)
    BEGIN
        SET @DELETE_TO = CONVERT(DATETIME, CONVERT(VARCHAR(10), dateadd(day,-2, GETDATE()), 111))
    END

-- Get Partion Id and range from CTE
;WITH PartitionInfo AS (
    SELECT TOP 1
        sprv.value AS [BoundaryValue],
        sprv.boundary_id AS [BoundaryId]
    FROM sys.partition_functions AS spf
             INNER JOIN sys.partition_range_values sprv
                        ON sprv.function_id=spf.function_id
    WHERE
            spf.name=N'pf_date_range'
      AND CONVERT(DATE, sprv.value) = CONVERT(DATE, @DELETE_TO)
) SELECT @BOUNDARY_ID = [BoundaryId], @BOUNDARY_VALUE = CONVERT(DATETIME, [BoundaryValue]) FROM PartitionInfo;

IF (@BOUNDARY_ID IS NOT NULL)
    BEGIN
        -- Truncate Partition
        TRUNCATE TABLE [dbo].[OnlineTxs] WITH (PARTITIONS(@BOUNDARY_ID));

        -- Delete Partition
        ALTER PARTITION FUNCTION pf_date_range() MERGE RANGE(@BOUNDARY_VALUE);

        -- Create new partition with the range as current date
        DECLARE @NEW_BOUNDARY_DATE VARCHAR(10);
        SET @NEW_BOUNDARY_DATE = CONVERT(VARCHAR(10), GETDATE(), 111);
        ALTER PARTITION SCHEME ps_date_range NEXT USED [PRIMARY];
        ALTER PARTITION FUNCTION pf_date_range() SPLIT RANGE (@NEW_BOUNDARY_DATE);
    END
GO

/* Manage Partitions */

-- Delete a partition
ALTER PARTITION FUNCTION pf_date_range()
MERGE RANGE(CONVERT(DATETIME, '2020-11-23'));

-- Create a partition
ALTER PARTITION SCHEME ps_date_range NEXT USED [PRIMARY];
ALTER PARTITION FUNCTION pf_date_range() SPLIT RANGE ('2020/11/21');


/* For testing */

-- Get a random integer between low and high (low <= the random interger <= high)
CREATE FUNCTION fn_random_int (@guid uniqueidentifier, @low INT, @high INT)
RETURNS INT
AS
BEGIN
  DECLARE @rand INT;
  SELECT @rand = ABS(CHECKSUM(@guid) % (@high - @low - 1)) + @low
  RETURN @rand;
END


-- Create mock data
DECLARE @seq int = 0
WHILE @seq < 1000
BEGIN
    SET @seq = @seq + 1

    INSERT INTO [dbo].[OnlineTxs]([CardNo],[Amt],[CreateOn])
    SELECT
    '123456****789' AS [CardNo],
    dbo.fn_random_int(NEWID(),100,9999) AS [Amt],
    DATEADD(day, -1 * dbo.fn_random_int(NEWID(),0,4), GETDATE()) AS [CreateOn]
END


/* Verification */

-- See partitions and how many records inside each partition
SELECT o.name AS [ObjectName],i.name AS [IndexName], partition_id AS [PartitionId], partition_number AS [PartitionNumber], [rows]
FROM sys.partitions p
INNER JOIN sys.objects o ON o.object_id=p.object_id
INNER JOIN sys.indexes i ON i.object_id=p.object_id and p.index_id=i.index_id
WHERE o.name LIKE '%OnlineTxs%'

-- See Boundary information, including of the ceiling datetime
SELECT sprv.value AS [Value],
       sprv.boundary_id AS [BoundaryId]
FROM sys.partition_functions AS spf
     INNER JOIN sys.partition_range_values sprv
        ON sprv.function_id=spf.function_id
WHERE (spf.name=N'pf_date_range')
ORDER BY [BoundaryId] ASC

-- See records count group by Partition Number
SELECT
$PARTITION.pf_date_range([CreateOn]) AS [PartitionNumber],
COUNT(*) AS [Cnt]
FROM [dbo].[OnlineTxs]
GROUP BY $PARTITION.pf_date_range([CreateOn])

-- See records by Partition Number
DECLARE @PARTITION_NUMBER INT = 1;
SELECT * FROM [dbo].[OnlineTxs]
WHERE $PARTITION.pf_date_range([CreateOn]) = @PARTITION_NUMBER;


