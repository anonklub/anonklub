# Compile circuit for the web
MERKLE_TREE_CODE=$(pwd)  # Set the parent directory
wasm-pack build ${MERKLE_TREE_CODE} --reference-types --release --target bundler --out-dir merkle-tree-wasm --out-name index --scope anonklub