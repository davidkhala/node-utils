#!/usr/bin/env bash
CURRENT=$(cd $(dirname ${BASH_SOURCE}) && pwd)
start() {
	export deployment=uat # this can be accessed inside nodejs
	pm2 start $(dirname $CURRENT)/express.js
}
$1
