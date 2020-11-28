
> Reference: [[PostgreSQL] pgAgent - Scheduling agent](https://karatejb.blogspot.com/2020/04/postgresql-pgagent-scheduling-agent.html)

## Create pgAgent job

```sql

/* Create pgAgent job */

DO $ifnotexist$

DECLARE
    jname VARCHAR(50) :='Routine Clean';
    matchedCnt INTEGER;
BEGIN

SELECT COUNT(1) INTO matchedCnt
FROM pgagent.pga_job WHERE "jobname"=jname;

IF matchedCnt <= 0 THEN

DO $routine_job$
DECLARE
    jid integer;
    scid integer;
BEGIN
-- Creating a new job
INSERT INTO pgagent.pga_job(
    jobjclid, jobname, jobdesc, jobhostagent, jobenabled
) VALUES (
    1::integer, 'Routine Clean'::text, ''::text, ''::text, true
) RETURNING jobid INTO jid;

-- Steps
-- Inserting a step (jobid: NULL)
INSERT INTO pgagent.pga_jobstep (
    jstjobid, jstname, jstenabled, jstkind,
    jstconnstr, jstdbname, jstonerror,
    jstcode, jstdesc
) VALUES (
    jid, 'Clean_AuditLogs'::text, true, 's'::character(1),
    'host=localhost port=5432 dbname=postgres connect_timeout=10 user=''postgres'''::text, ''::name, 'f'::character(1),
    'DELETE FROM system."AuditLogs" WHERE "ActionTstamp" < current_date - interval ''5 year'''::text, ''::text
) ;



-- Schedules
-- Inserting a schedule
INSERT INTO pgagent.pga_schedule(
    jscjobid, jscname, jscdesc, jscenabled,
    jscstart, jscend,    jscminutes, jschours, jscweekdays, jscmonthdays, jscmonths
) VALUES (
    jid, 'Monthly'::text, ''::text, true,
    '2020-01-01 00:00:00+00'::timestamp with time zone, '2099-12-31 00:00:00+00'::timestamp with time zone,
    -- Minutes
    ARRAY[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]::boolean[],
    -- Hours
    ARRAY[false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]::boolean[],
    -- Week days
    ARRAY[false,false,false,false,false,false,false]::boolean[],
    -- Month days
    ARRAY[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true]::boolean[],
    -- Months
    ARRAY[true,true,true,true,true,true,true,true,true,true,true,true]::boolean[]
) RETURNING jscid INTO scid;
END
$routine_job$;

END IF;

END
$ifnotexist$;

```


## Create pgAgent job with dblink

```sql

/* pgagent */
CREATE EXTENSION IF NOT EXISTS pgagent;
--DROP EXTENSION IF EXISTS pgagent;

GRANT USAGE ON SCHEMA pgagent TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA pgagent TO postgres;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA pgagent TO postgres;

/* dblink */
CREATE EXTENSION IF NOT EXISTS dblink;

-- Test dblink
SELECT * FROM pg_available_extensions
SELECT dblink_connect('host=localhost user=postgres password=xxxx dbname=postgres');
SELECT * FROM dblink('host=localhost port=5432 user=postgres password=xxxx dbname=postgres', 'SELECT jagpid FROM pgagent.pga_jobagent') q(jagpid integer);

/* dblink wrapper */
CREATE FOREIGN DATA WRAPPER pgagent_wrapper VALIDATOR postgresql_fdw_validator;
CREATE SERVER db_postgres FOREIGN DATA WRAPPER pgagent_wrapper OPTIONS (host '', dbname 'postgres' );
CREATE USER MAPPING FOR postgres SERVER db_postgres OPTIONS (user 'postgres', password 'xxxx');

--DROP USER MAPPING IF EXISTS FOR postgres SERVER db_postgres;
--DROP SERVER IF EXISTS db_postgres;
--DROP FOREIGN DATA WRAPPER IF EXISTS pgagent_wrapper;

-- Test
SELECT * FROM dblink('db_postgres', 'SELECT jagpid FROM pgagent.pga_jobagent') q(jagpid integer);




SELECT * FROM pg_timezone_names WHERE name = current_setting('TIMEZONE');
SELECT * FROM dblink('db_postgres', 'SELECT * FROM pgagent.pga_jobagent') AS DATA(jagpid integer, jaglogintime timestamptz, jagstation text);
SELECT * FROM pgagent."pga_jobagent"
SELECT * FROM pgagent.pga_joblog
SELECT * FROM pgagent.pga_jobsteplog
SELECT * FROM pgagent.pga_exception

/* Test data */

--Backup
SELECT * INTO system."AuditLogs_bk" FROM system."AuditLogs"

SELECT COUNT(*) FROM system."AuditLogs";
SELECT * FROM system."AuditLogs_bk"
ORDER BY "ActionTstamp"
limit 10 

INSERT INTO system."AuditLogs"
SELECT * FROM system."AuditLogs_bk";


/* Create pgAgent job */


-- Creating a new job


DO $pgagent_job$
BEGIN

PERFORM public.dblink_exec('db_postgres',
'
DO $ifnotexist$

DECLARE
    jname VARCHAR(50) :=''Routine Clean'';
    matchedCnt INTEGER;
BEGIN

SELECT COUNT(1) INTO matchedCnt
FROM pgagent.pga_job WHERE "jobname"=jname;

IF matchedCnt <= 0 THEN

DO $routine_job$
DECLARE
    jid integer;
    scid integer;
BEGIN
INSERT INTO pgagent.pga_job(
    jobjclid, jobname, jobdesc, jobhostagent, jobenabled
) VALUES (
    1::integer, ''Routine Clean''::text, ''''::text, ''''::text, true
) RETURNING jobid INTO jid;

-- Steps
-- Inserting a step (jobid: NULL)
INSERT INTO pgagent.pga_jobstep (
    jstjobid, jstname, jstenabled, jstkind,
    jstconnstr, jstdbname, jstonerror,
    jstcode, jstdesc
    ) VALUES (
    jid, ''Clean_AuditLogs''::text, true, ''s''::character(1),
    ''host=localhost port=5432 dbname=MiniTis connect_timeout=10 user=''''postgres''''''::text, ''''::name, ''f''::character(1),
    ''DELETE FROM system."AuditLogs" WHERE "ActionTstamp" < current_date - interval ''''5 year''''''::text, ''''::text
    );

-- Schedules
-- Inserting a schedule
INSERT INTO pgagent.pga_schedule(
    jscjobid, jscname, jscdesc, jscenabled,
    jscstart, jscend, jscminutes, jschours, jscweekdays, jscmonthdays, jscmonths
    ) VALUES (
    jid, ''Monthly''::text, ''''::text, true,
    ''2020-01-01 00:00:00+00''::timestamp with time zone, ''2099-12-31 00:00:00+00''::timestamp with time zone,
    -- Minutes
    ARRAY[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]::boolean[],
    -- Hours
    ARRAY[false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]::boolean[],
    -- Week days
    ARRAY[false,false,false,false,false,false,false]::boolean[],
    -- Month days
    ARRAY[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true]::boolean[],
    -- Months
    ARRAY[true,true,true,true,true,true,true,true,true,true,true,true]::boolean[]
    ) RETURNING jscid INTO scid;
END
$routine_job$;

END IF;

END
$ifnotexist$;
');

END
$pgagent_job$;


/* Delete pgAgent job */


SELECT public.dblink_exec('db_postgres',
'
DO $$
DECLARE
    jname VARCHAR(50) := ''Routine Clean'';
    jid INTEGER;
BEGIN

SELECT "jobid" INTO jid from pgagent."pga_job"
WHERE "jobname" = jname;

DELETE FROM pgagent."pga_schedule"
WHERE "jscjobid" = jid;

DELETE FROM pgagent.pga_jobstep
WHERE "jstjobid" = jid;

DELETE FROM pgagent."pga_job"
WHERE "jobid" = jid;
END
$$;
');


```