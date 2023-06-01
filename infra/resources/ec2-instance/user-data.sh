#!/bin/bash

set -e

function install_node() {
  curl https://get.volta.sh | bash
  ln -s /.volta/bin/volta /usr/bin/volta
  volta install node@19

  ln -s /.volta/bin/node /usr/bin/node
  ln -s /.volta/bin/npm /usr/bin/npm
  npm i -g pnpm
  ln -s /.volta/bin/pnpm /usr/bin/pnpm
}

function install_redis() {
  sudo apt update
  sudo apt install redis-server
  sudo systemctl enable redis-server.service
  sudo systemctl start redis-server.service
}

function build() {
  cd /home/ubuntu
  git clone https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa
  cd e2e-zk-ecdsa
  pnpm --filter @anonset/prove-api... i

  pnpm --filter @anonset/prove-api... build
  rm -rf {./,apis/prove,membership}/node_modules
  pnpm --filter @anonset/prove-api... i --prod
}

function start() {
  cd /home/ubuntu/apis/proving
  nohup node dist >>log.txt 2>&1
}

function main() {
  # declare constant

  install_node
  install_redis
  build
  start
}

main "$@"
