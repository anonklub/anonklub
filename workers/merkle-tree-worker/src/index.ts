import { wrap, Remote } from "comlink";
import { IMerkleTreeWorker } from "./interface";

let MerkleTreeWorker: Remote<IMerkleTreeWorker>;

if (typeof window !== 'undefined') {
    MerkleTreeWorker = wrap<IMerkleTreeWorker>(new Worker(new URL("./worker.js", import.meta.url)));
}

export { MerkleTreeWorker };
export { type GenerateMerkleProofFn } from "./interface";