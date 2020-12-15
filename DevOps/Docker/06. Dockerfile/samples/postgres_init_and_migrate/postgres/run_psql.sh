#!/usr/bin/env bash

# Create extensions if not exist
psql -p $POSTGRES_PORT -U $POSTGRES_USER -d postgres -f /docker-entrypoint-initdb.d/create_extensions.sql
echo
