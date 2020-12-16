#!/bin/bash

# Start services
pgagent hostaddr=127.0.0.1 port=$POSTGRES_PORT dbname=postgres user=$POSTGRES_USER
echo