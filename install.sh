#!/usr/bin/env bash
set -e
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
LTS() {
	if ! node --version | grep 'v14.'; then
		if [[ $(uname) == "Darwin" ]]; then
			brew install node@14
			echo 'export PATH="/usr/local/opt/node@14/bin:$PATH"' >>~/.bash_profile
			export LDFLAGS="-L/usr/local/opt/node@14/lib"
			export CPPFLAGS="-I/usr/local/opt/node@14/include"
		else
			curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
			sudo apt -qq install -y nodejs
		fi
	fi
}
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
nodeGYPDependencies() {
	sudo apt install -y gcc make g++ python # required by node-gyp
}
"$@"
