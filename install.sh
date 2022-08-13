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


build-essential(){
	lsb_dist=$(curl https://raw.githubusercontent.com/davidkhala/linux-utils/main/system.sh | bash -s get_distribution)
	case "$lsb_dist" in

		ubuntu)
			curl https://raw.githubusercontent.com/davidkhala/ubuntu-utils/master/nodejs.sh | bash -s build-essential
		;;
		
		rhel|ol)
			curl https://raw.githubusercontent.com/davidkhala/fedora-utils/master/nodejs.sh | bash -s nodeGYPDependencies
		;;

	esac
	sudo npm install -g node-pre-gyp
}

"$@"
