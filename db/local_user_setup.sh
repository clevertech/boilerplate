#!/bin/bash
PGPASSWORD=localdev psql -U postgres -h localhost -p 8001 -d rpg -c "create role appuser login password 'localdev';"
