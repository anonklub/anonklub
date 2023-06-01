#!/bin/bash

set -e

function install_node() {
  curl https://get.volta.sh | bash
  "$HOME"/.volta/bin/volta install node@19
  npm install -g pnpm
}

function install_redis() {
  sudo apt update
  sudo apt install redis-server
  sudo systemctl enable redis-server.service
  sudo systemctl start redis-server.service
}

function build() {
  git clone https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa
  cd e2e-zk-ecdsa
  pnpm --filter @anonset/prove-api... i

  pnpm --filter @anonset/prove-api... build
  rm -rf {./,apis/prove,membership}/node_modules
  pnpm --filter @anonset/prove-api... i --prod
}

function start() {
  cd apis/proving
  nohup node dist >>log.txt 2>&1
}

function main() {
  install_node
  install_redis
  build
  start
}

main "$@"
