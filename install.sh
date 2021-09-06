#!/usr/bin/env bash
set -e

typeScript() {
	sudo npm install -g typescript
}
nodeVersionManager() {
	if ! nvm --version; then
		curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
		export NVM_DIR="$HOME/.nvm"
		[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                   # This loads nvm
		[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion
	fi
}
yarn() {
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
	sudo apt update && sudo apt install yarn

}
pm2() {
	if node --version | grep 'v8.'; then
		sudo npm install -g pm2@4.1
	else
		sudo npm install -g pm2
	fi

}
build-essential(){
	sudo apt-get install -y build-essential ## To install dependencies: , make, gcc, g++
}
# required by node-gyp
nodeGYPDependencies() {
	build-essential
	sudo apt install -y python 
}
"$@"
