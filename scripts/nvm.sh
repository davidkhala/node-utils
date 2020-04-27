#!/usr/bin/env bash
set -e
fcn=$1
remain_params=""
for ((i = 2; i <= ${#}; i++)); do
	j=${!i}
	remain_params="$remain_params $j"
done
useSystem() {
	nvm use system
	nvm alias default system
}

$fcn $remain_params
