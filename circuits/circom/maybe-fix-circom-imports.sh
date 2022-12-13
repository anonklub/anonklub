#!/bin/bash

dest="$PWD/node_modules/circom-ecdsa/node_modules"

if [[ ! -d $dir ]];then
  src=node_modules/circomlib
  cp -r $src $dest
fi