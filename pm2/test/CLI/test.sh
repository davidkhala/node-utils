#!/usr/bin/env bash
CURRENT=$(cd $(dirname ${BASH_SOURCE}) && pwd)
export deployment=uat; # this can be accessed inside nodejs
pm2 start $CURRENT/index.js