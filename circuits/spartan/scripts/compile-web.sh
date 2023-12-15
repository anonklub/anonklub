# Compile circuit for the web
CIRCUIT_DIR=$(pwd)  # Set the parent directory
wasm-pack build ${CIRCUIT_DIR} --target bundler --out-dir circuit-web