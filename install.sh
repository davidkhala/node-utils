#!/usr/bin/env bash
set -e
fcn=$1
remain_params=""
for ((i = 2; i <= ${#}; i++)); do
	j=${!i}
	remain_params="$remain_params $j"
done
install8() {
	if ! node --version | grep 'v8.'; then
		if [[ $(uname) == "Darwin" ]]; then
			brew install node@8
			echo 'export PATH="/usr/local/opt/node@8/bin:$PATH"' >>~/.bash_profile
			export LDFLAGS="-L/usr/local/opt/node@8/lib"
			export CPPFLAGS="-I/usr/local/opt/node@8/include"
		else
			curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
			sudo apt -qq install -y nodejs
		fi
	fi
}
install10() {
	if ! node --version | grep 'v10.'; then
		if [[ $(uname) == "Darwin" ]]; then
			brew install node@10
			echo 'export PATH="/usr/local/opt/node@10/bin:$PATH"' >>~/.bash_profile
			export LDFLAGS="-L/usr/local/opt/node@10/lib"
			export CPPFLAGS="-I/usr/local/opt/node@10/include"
		else
			curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
			sudo apt -qq install -y nodejs
		fi
	fi
}
typeScript() {
	sudo npm install -g typescript
}
pm2() {
	sudo npm install -g pm2
}
nodeGYPDependencies() {
	sudo apt install -y make g++ # required by node-gyp
}
$fcn $remain_params
