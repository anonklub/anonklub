# Compile circuit for the web
MERKLE_TREE_CODE=$(pwd)  # Set the parent directory
wasm-pack build ${MERKLE_TREE_CODE} --target bundler --out-dir wasm-pkg --out-name index --scope anonklub
