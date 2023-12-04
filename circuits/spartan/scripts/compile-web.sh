# Compile circuit for the web
CIRCUIT_DIR=$(pwd)  # Set the parent directory
wasm-pack build ${CIRCUIT_DIR} --target web --out-dir circuit-web && \ 