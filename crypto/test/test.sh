#!/usr/bin/env bash
CURRENT=$(cd $(dirname ${BASH_SOURCE}) && pwd)
cd "$CURRENT/x509"
npm install
cd -