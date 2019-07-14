#!/bin/sh
DBHOST=$(/sbin/ip route|awk '/default/ { print $3 }'|head -n 1)
sqitch --db-host $DBHOST --db-name $DBNAME "$@"
#sqitch "$@"
