#!/usr/bin/env bash
globalInstall(){
    sudo npm install eslint -g
    sudo npm install eslint-plugin-standard -g
    sudo npm install eslint-plugin-prettier -g
}
globalUninstall(){
    sudo npm uninstall eslint-plugin-standard -g
    sudo npm uninstall eslint-plugin-prettier -g
    sudo npm uninstall eslint -g
}
$1