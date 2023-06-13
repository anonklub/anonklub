#!/bin/bash

dest="$PWD/node_modules/circom-ecdsa/node_modules/circomlib"

if [[ ! -d $dir ]];then
  mkdir -p $dest
  src=node_modules/circomlib/circuits
  cp -r $src $dest
fi