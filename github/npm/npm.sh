set -e
login() {
	echo "npm.github login (use GIT_TOKEN instead of password): "
	npm login --registry=https://npm.pkg.github.com
}
$1
