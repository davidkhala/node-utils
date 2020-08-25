#!/usr/bin/env bash
set -e
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
login() {
	if ! npm whoami &> /dev/null; then
		echo "########## npm acount login ##########"
		npm login
		echo "########## npm acount login success ##########"
	fi
}
sortDependency() {
	npx sort-package-json # npm>=5.2.0, powered by https://github.com/keithamus/sort-package-json
}
"$@"
