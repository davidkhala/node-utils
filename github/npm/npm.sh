set -e
login() {
	echo "npm.github login:"
	npm login --registry=https://npm.pkg.github.com
}
$1
