#!/usr/bin/env bash
set -e
useSystem() {
	nvm use system
	nvm alias default system
}

"$@"
