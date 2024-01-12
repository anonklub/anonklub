import { wrap } from "comlink";
import { IMerkleTreeWorker } from "./interface";

const MerkleTreeWorker = wrap<IMerkleTreeWorker>(new Worker(new URL("./worker.js", import.meta.url)));

export { MerkleTreeWorker };
export { type GenerateMerkleProofFn } from "./interface";
