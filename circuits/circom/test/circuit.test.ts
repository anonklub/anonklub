const chai = require("chai");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;

const buildPoseidon = require("circomlibjs").buildPoseidon;

const assert = chai.assert;

describe("Poseidon Circuit test", function () {
    let poseidon;
    let F;
    let circuit;

    this.timeout(1000000);

    before( async () => {
        let p = path.join(__dirname, "membership_test.circom");
        circuit = await wasm_tester(p);
        poseidon = await buildPoseidon();
        F = poseidon.F;
    });


    it("Should check membership of a depth 2 merkle tree", async () => {
        // merkle
        const leaf = 2;
        const root = F.toObject(poseidon([poseidon([1,2]), poseidon([3,4])]));
        const path = [1, F.toObject(poseidon([3,4]))];
        const indices = [1, 0];

        const w = await circuit.calculateWitness({leaf: leaf, root: root, pathElements: path, pathIndices: indices}, true);
        await circuit.checkConstraints(w);
    });
});