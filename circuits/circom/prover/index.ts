import express from 'express';
import { ProofRequest, stringifyWithBigInts } from "./interface";
import { buildPoseidon } from 'circomlibjs'
import {
    bigintToArray,
    MerkleTree,
    uint8ArrayToBigint,
  } from '../test/helpers'
import { execSync } from 'child_process';
import { rmSync } from 'fs';

const app = express();
app.use(express.json());
const port = 3000;

app.post('/', async (req, res) => {
    let request = ProofRequest.fromReq(req.body);
    const poseidon = await buildPoseidon()

    const tree = new MerkleTree(request.addresses, 21, poseidon, poseidon.F);
    const merkleProof = tree.merkleProof(request.address_index);

    const circuitInput = {
        msghash: bigintToArray(64, 4, request.msghash),
        pathElements: merkleProof.pathElements,
        pathIndices: merkleProof.pathIndices,
        pubkey: [bigintToArray(64, 4, request.pubkey.x), bigintToArray(64, 4, request.pubkey.y)],
        r: bigintToArray(64, 4, uint8ArrayToBigint(request.signature.slice(0, 32))),
        root: tree.root(),
        s: bigintToArray(64, 4, uint8ArrayToBigint(request.signature.slice(32, 64))),
    }

    // TODO: probably don't have to call this as a separate command, this is just how the code is generated from circom
    execSync("node generate_witness.js circuit.wasm ../input.json ../witness.wtns");
    execSync("snarkjs groth16 prove circuit_0001.zkey wasm/witness.wtns proof.json public.json");
    res.sendFile("proof.json");
    rmSync("proof.json");
    rmSync("witness.wtns");

    console.log(stringifyWithBigInts(circuitInput))
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})