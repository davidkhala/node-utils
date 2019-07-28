#!/usr/bin/env bash
set -e
fcn=$1
remain_params=""
for ((i = 2; i <= ${#}; i++)); do
	j=${!i}
	remain_params="$remain_params $j"
done
packageLock() {
	local CMD="npm config set package-lock $1"
	echo $CMD
	$CMD
}
$fcn $remain_params
