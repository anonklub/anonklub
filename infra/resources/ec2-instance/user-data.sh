#!/bin/bash

set -e

INSTALL_DIR=/home/ubuntu

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
  cd "$INSTALL_DIR"
  git clone https://github.com/anonklub/anonklub
  cd anonklub

  pnpm --filter @anonklub/prove-api... i
  pnpm --filter @anonklub/prove-api... build
  rm -rf {./,apis/prove,@anonklub/proof}/node_modules
  pnpm --filter @anonklub/prove-api... i --prod
}

function start() {
  cd "$INSTALL_DIR"/anonklub/apis/prove
  nohup node dist >> stdout.log 2>> stderr.log
}

function main() {
  mkdir -p $INSTALL_DIR
  install_redis
  install_node
  build
  chown -R ubuntu:ubuntu $INSTALL_DIR # needed to be able to copy over zkey with ubuntu user
  start > $INSTALL_DIR/install.log 2>&1
}

main "$@"
