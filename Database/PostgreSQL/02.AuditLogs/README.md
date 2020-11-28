# Create

## Create shema and table

```sql
DO $table$
BEGIN

IF NOT EXISTS(
		SELECT table_name
		FROM   information_schema.tables
		WHERE  table_schema = 'system'
		AND    table_name = 'AuditLogs'
    )
THEN
	/* Create table */
	CREATE TABLE system."AuditLogs" (
    "SchemaName" text NOT NULL,
    "TableName" text NOT NULL,
    "UserName" text,
    "ActionTstamp" TIMESTAMP WITH TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Action" TEXT NOT NULL CHECK ("Action" IN ('I','D','U')),
    "OriginalData" text,
    "NewData" text,
    "Query" text
    ) WITH (fillfactor=100);

    REVOKE ALL ON system."AuditLogs" FROM public;
    GRANT ALL ON schema system TO sa;
	GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA system TO sa;
	GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA system TO sa;
	GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA system TO sa;

    CREATE INDEX audit_logs_schema_table_idx
    ON system."AuditLogs"((( "SchemaName" ||'.'|| "TableName" )::TEXT));

    CREATE INDEX audit_logs_action_tstamp_idx
    ON system."AuditLogs"("ActionTstamp");

    CREATE INDEX audit_logs_action_idx
    ON system."AuditLogs"("Action");

END IF;
END
$table$;
```


## Create Trigger fuction

```sql
DO $trigger_function$
BEGIN

CREATE OR REPLACE FUNCTION system.tf_modified_audit() RETURNS TRIGGER AS $body$
DECLARE
    v_old_data TEXT;
    v_new_data TEXT;
BEGIN
    /*  If this actually for real auditing (where you need to log EVERY action),
        then you would need to use something like dblink or plperl that could log outside the transaction,
        regardless of whether the transaction committed or rolled back.
    */

    /* This dance with casting the NEW and OLD values to a ROW is not necessary in pg 9.0+ */

    IF (TG_OP = 'UPDATE') THEN
        v_old_data := ROW(OLD.*);
        v_new_data := ROW(NEW.*);
        INSERT INTO system."AuditLogs" ("SchemaName", "TableName", "UserName", "Action", "OriginalData", "NewData", "Query")
        VALUES (TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,session_user::TEXT,substring(TG_OP,1,1),v_old_data,v_new_data, current_query());
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        v_old_data := ROW(OLD.*);
        INSERT INTO system."AuditLogs" ("SchemaName", "TableName", "UserName", "Action", "OriginalData", "Query")
        VALUES (TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,session_user::TEXT,substring(TG_OP,1,1),v_old_data, current_query());
        RETURN OLD;
    ELSIF (TG_OP = 'INSERT') THEN
        v_new_data := ROW(NEW.*);
        INSERT INTO system."AuditLogs" ("SchemaName", "TableName", "UserName", "Action", "NewData", "Query")
        VALUES (TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,session_user::TEXT,substring(TG_OP,1,1),v_new_data, current_query());
        RETURN NEW;
    ELSE
        RAISE WARNING '[tf_modified_audit] - Other action occurred: %, at %',TG_OP,now();
        RETURN NULL;
    END IF;

EXCEPTION
    WHEN data_exception THEN
        RAISE WARNING '[tf_modified_audit] - UDF ERROR [DATA EXCEPTION] - SQLSTATE: %, SQLERRM: %',SQLSTATE,SQLERRM;
        RETURN NULL;
    WHEN unique_violation THEN
        RAISE WARNING '[tf_modified_audit] - UDF ERROR [UNIQUE] - SQLSTATE: %, SQLERRM: %',SQLSTATE,SQLERRM;
        RETURN NULL;
    WHEN OTHERS THEN
        RAISE WARNING '[tf_modified_audit] - UDF ERROR [OTHER] - SQLSTATE: %, SQLERRM: %',SQLSTATE,SQLERRM;
        RETURN NULL;
END;
$body$
LANGUAGE plpgsql
SECURITY DEFINER --Run with the User ID and security context of the function owner
SET search_path = pg_catalog, system;

END
$trigger_function$;
```



## Create_triggers


```sql
DO $triggers$
BEGIN

CREATE TRIGGER t_audit_mysecrets
AFTER INSERT OR UPDATE OR DELETE ON public."MySecrets"
FOR EACH ROW EXECUTE PROCEDURE system.tf_modified_audit();

-- ...more

END    
$triggers$;

```



# Remove

```sql
DO $triggers$
BEGIN

DROP TRIGGER IF EXISTS t_audit_mysecrets ON public."MySecrets";

END
$triggers$;

```


```sql
DO $trigger$
BEGIN

DROP FUNCTION IF EXISTS system.tf_modified_audit();

END
$trigger$;
```


```sql
DO $table$
BEGIN

IF EXISTS(
		SELECT table_name
		FROM   information_schema.tables
		WHERE  table_schema = 'system'
		AND    table_name = 'AuditLogs'
    )
THEN
	/* Drop table */
	DROP TABLE system."AuditLogs";
END IF;
END
$table$;
```