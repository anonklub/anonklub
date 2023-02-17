import http from "http";
import { ProofRequest, stringifyWithBigInts } from "./interface";
import { buildPoseidon } from 'circomlibjs'
import {
    bigintToArray,
    MerkleTree,
    uint8ArrayToBigint,
  } from '../test/helpers'

const myServer = http.createServer((req, res) => {
    // Read the data from the request
    let data = "";

    req.on("data", (chunk) => {
        data += chunk.toString();
    });

    // When the request is done
    req.on("end", async () => {
        let request = ProofRequest.fromJSON(data);
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

        console.log(stringifyWithBigInts(circuitInput))
    });

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            success: true,
            message: {a: 1},
    }));
});

myServer.listen(3000, () => {
    console.log('Server is running on port 3000. Go to http://localhost:3000/')
});