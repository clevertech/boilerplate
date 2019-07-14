#!/bin/sh
sqitch --db-host db --db-name $DBNAME "$@"
#sqitch "$@"
