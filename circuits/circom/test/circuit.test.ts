const chai = require("chai");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;
const ethers = require('ethers');
const buildPoseidon = require("circomlibjs").buildPoseidon;

const expect = chai.expect;

describe("Poseidon Merkle Tree", function () {
    let poseidon;
    let F;
    let circuit;

    this.timeout(1000000);

    before( async () => {
        let p = path.join(__dirname, "merkle_tree_test.circom");
        circuit = await wasm_tester(p, 
            // { "verbose": true }
        );
        poseidon = await buildPoseidon();
        F = poseidon.F; // TODO: do we actually need this or is it the default field?
    });


    it("Should check membership in a depth 2 merkle tree", async () => {
        // merkle
        const leaf = 2;
        const root = F.toObject(poseidon([poseidon([1,2]), poseidon([3,4])]));
        const path = [1, F.toObject(poseidon([3,4]))];
        const indices = [1, 0];

        console.log(circuit.calculateWitness[0])
        const w = await circuit.calculateWitness({leaf: leaf, root: root, pathElements: path, pathIndices: indices}, true);
        await circuit.checkConstraints(w);
    });
});


import { getPublicKey, sign, Point } from '@noble/secp256k1';

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

describe("SetMembership", function () {
    this.timeout(1000 * 1000);
    let poseidon;
    let F;

    let circuit: any;
    before(async function () {
        circuit = await wasm_tester(path.join(__dirname, "membership_test.circom"), { "verbose": true });
        console.log("compiled circom")
        poseidon = await buildPoseidon();
        F = poseidon.F; // TODO: do we actually need this or is it the default field?
    });
    
    it("Should produce valid proofs", async () => {
        var privkeys: Array<bigint> = [88549154299169935420064281163296845505587953610183896504176354567359434168161n,
            37706893564732085918706190942542566344879680306879183356840008504374628845468n,
            90388020393783788847120091912026443124559466591761394939671630294477859800601n,
            110977009687373213104962226057480551605828725303063265716157300460694423838923n];

        var addresses = privkeys.map(priv => 
            ethers.BigNumber.from(ethers.utils.computeAddress(ethers.BigNumber.from(priv))).toBigInt()
        );

        var merkle_root = F.toObject(poseidon(
            poseidon([addresses[0], addresses[1]]),
            poseidon([addresses[2], addresses[3]]),
        ));
        const path = [addresses[1], F.toObject(poseidon([addresses[2], addresses[3]]))];
        const indices = [0, 0];
        const leaf = addresses[0];
        
        let privkey = privkeys[0];
        let pubkey: Point = Point.fromPrivateKey(privkey);
        let msghash_bigint: bigint = 1234n;
        var msghash: Uint8Array = bigint_to_Uint8Array(msghash_bigint);
        var sig: Uint8Array = await sign(msghash, bigint_to_Uint8Array(privkey), {canonical: true, der: false})
        var msghash_array: bigint[] = bigint_to_array(64, 4, msghash_bigint);
        
        let witness = await circuit.calculateWitness({
            "r": bigint_to_array(64, 4, Uint8Array_to_bigint(sig.slice(0, 32))),
            "s": bigint_to_array(64, 4, Uint8Array_to_bigint(sig.slice(32, 64))),
            "msghash": msghash_array,
            "pubkey": [
                bigint_to_array(64, 4, pubkey.x),
                bigint_to_array(64, 4, pubkey.y)
            ],
            "pathElements": path,
            "pathIndices": indices,
            "leaf": leaf,
            "root": merkle_root,
        });

        await circuit.checkConstraints(witness);
    })

    return;
});

// Helper methods
// TODO: import from circom-ecdsa instead

// bigendian
function bigint_to_Uint8Array(x: bigint) {
    var ret: Uint8Array = new Uint8Array(32);
    for (var idx = 31; idx >= 0; idx--) {
        ret[idx] = Number(x % 256n);
        x = x / 256n;
    }
    return ret;
}

// bigendian
function Uint8Array_to_bigint(x: Uint8Array) {
    var ret: bigint = 0n;
    for (var idx = 0; idx < x.length; idx++) {
        ret = ret * 256n;
        ret = ret + BigInt(x[idx]);
    }
    return ret;
}

function bigint_to_array(n: number, k: number, x: bigint) {
    let mod: bigint = 1n;
    for (var idx = 0; idx < n; idx++) {
        mod = mod * 2n;
    }

    let ret: bigint[] = [];
    var x_temp: bigint = x;
    for (var idx = 0; idx < k; idx++) {
        ret.push(x_temp % mod);
        x_temp = x_temp / mod;
    }
    return ret;
}