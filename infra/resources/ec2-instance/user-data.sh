#!/bin/bash

set -e

function install_node() {
  curl https://get.volta.sh | bash
  "$HOME"/.volta/bin/volta install node@19
  npm install -g pnpm
}

function build() {
  git clone https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa
  cd e2e-zk-ecdsa
  pnpm --filter @anonset/prove-api... i

  pnpm --scope @anonset/prove-api... run build
  rm -rf {./,apis/prove,membership}/node_modules
  pnpm --filter @anonset/prove-api... i --prod
}

function start() {
  cd apis/proving
  nohup node dist >>log.txt 2>&1
}

function main() {
  install_node
  build
  start
}

main "$@"
