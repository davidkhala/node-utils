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
tokenList() {
	local format
	if [[ "$1" == "json" ]]; then
		format="--json"
	elif [[ "$1" == "table" ]]; then
		format="--parseable"
	fi
	npm token list $format
}
$fcn $remain_params
