#!/usr/bin/env bash

psql -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB -f /docker-entrypoint-initdb.d/migrate_script.sql
echo