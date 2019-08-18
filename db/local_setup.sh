#!/bin/bash
export PGPASSWORD=localdev
export PGUSER=postgres
psql -U $PGUSER -h localhost -p 8001 -c "create database if not exists rpg;"
psql -U $PGUSER -h localhost -p 8001 -c "create database if not exists rpg-test;"
psql -U $PGUSER -h localhost -p 8001 -d rpg -c "create role appuser login password '$PGPASSWORD';"
psql -U $PGUSER -h localhost -p 8001 -d rpg-test -c "create role appuser login password '$PGPASSWORD';"
