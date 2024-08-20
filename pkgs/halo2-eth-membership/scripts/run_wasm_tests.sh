#!/bin/sh
# TODO: writing tests for lib.rs e2e testing wasm in browser
wasm-pack test --headless --firefox -- --features wasm-tests
