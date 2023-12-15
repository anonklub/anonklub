import * as fs from 'fs';
import pako from "pako";

/**
 * Load the wasm file and output a typescript file with the wasm bytes embedded
 */
const embedWasmBytes = async () => {
  let wasm = fs.readFileSync('./circuit-web/spartan_bg.wasm');

  let bytes = new Uint8Array(wasm.buffer);
//
  const compressedData = pako.deflate(bytes); // Compress

  const file = `
    export const wasmBytes = new Uint8Array([${bytes.toString()}]);
  `;

  fs.writeFileSync('./circuit-web/wasm_bytes.ts', file);
};

embedWasmBytes();