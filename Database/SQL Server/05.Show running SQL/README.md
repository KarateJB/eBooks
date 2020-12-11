```sql
SELECT      r.[scheduler_id],                 --排程器識別碼,
            r.[status],                       --要求的狀態,
            r.[session_id],                   --SPID,
            r.[blocking_session_id],          --Blocking session id
            -- q.text as [execute_full_sql],    --完整的SQL指令
            substring(
                    ltrim(q.text),
                    r.statement_start_offset/2+1,
                    (CASE
                         WHEN r.statement_end_offset = -1
                             THEN LEN(CONVERT(nvarchar(MAX), q.text)) * 2
                         ELSE r.statement_end_offset
                         END - r.statement_start_offset)/2)
                         AS [execute_sql],              --正在執行的 T-SQL 命令
            r.[cpu_time] as [cpu_time(ms)],   --CPU Time(ms)
            r.[start_time],                   --開始時間
            r.[total_elapsed_time],           --執行總時間
            r.[reads],                        --讀取數
            r.[writes],                       --寫入數
            r.[logical_reads],                --邏輯讀取數
            d.[name] as [database]             --資料庫名稱
FROM        sys.dm_exec_requests r
                CROSS APPLY sys.dm_exec_sql_text(sql_handle) AS q
                LEFT JOIN sys.databases d ON (r.database_id=d.database_id)
WHERE       r.session_id > 50 AND r.session_id <> @@SPID
ORDER BY    r.total_elapsed_time desc
```