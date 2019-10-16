set -e
monitor() {
	pm2 monit
}

$1
