#!/bin/bash

set -e

function install_node() {
  curl https://get.volta.sh | bash

  export VOLTA_HOME="$HOME/.volta"
  export PATH="$VOLTA_HOME/bin:$PATH"

  volta install node@19
  npm i -g pnpm
  pnpm -v
}

function install_redis() {
  apt update
  apt install -y redis-server
  systemctl enable redis-server.service
  systemctl start redis-server.service
}

function build() {
  cd "$install_dir"
  git clone https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa
  cd e2e-zk-ecdsa

  pnpm --filter @anonset/prove-api... i
  pnpm --filter @anonset/prove-api... build
  rm -rf {./,apis/prove,membership}/node_modules
  pnpm --filter @anonset/prove-api... i --prod
}

function start() {
  cd "$install_dir"/e2e-zk-ecdsa/apis/prove
  nohup node dist >> log.txt 2>&1
}

function main() {
  local install_dir=/home/ubuntu
  mkdir -p $install_dir

  install_redis
  install_node
  build
  start > $install_dir/install.log 2>&1
}

main "$@"
