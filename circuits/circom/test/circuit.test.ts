const chai = require("chai");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;

const buildPoseidon = require("circomlibjs").buildPoseidon;

const expect = chai.expect;

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


import { getPublicKey, sign, Point } from '@noble/secp256k1';

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

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

describe("ECDSAVerifyNoPubkeyCheck", function () {
    this.timeout(1000 * 1000);

    console.log("hello")
    let circuit: any;
    before(async function () {
        console.log("asdf")
        circuit = await wasm_tester(path.join(__dirname, "membership_test.circom"));
        console.log("asdfsa");
        circuit = await wasm_tester(path.join(__dirname, "test_ecdsa_verify.circom"));
        console.log("agdfs")
    });
    
    console.log("ffff")
    it("Should verify signatures", async () => {
        console.log(1);
        let privkey = 88549154299169935420064281163296845505587953610183896504176354567359434168161n;
        let pubkey: Point = Point.fromPrivateKey(privkeys[idx]);
        let msghash_bigint: bigint = 1234n;
        var msghash: Uint8Array = bigint_to_Uint8Array(msghash_bigint);
        console.log(1);
        
        var sig: Uint8Array = await sign(msghash, bigint_to_Uint8Array(privkey), {canonical: true, der: false})
        console.log(1);
        console.log("signed");
        var r: Uint8Array = sig.slice(0, 32);
        var r_bigint: bigint = Uint8Array_to_bigint(r);
        var s: Uint8Array = sig.slice(32, 64);
        var s_bigint:bigint = Uint8Array_to_bigint(s);
        
        var r_array: bigint[] = bigint_to_array(64, 4, r_bigint);
        var s_array: bigint[] = bigint_to_array(64, 4, s_bigint);
        var msghash_array: bigint[] = bigint_to_array(64, 4, msghash_bigint);
        var pub0_array: bigint[] = bigint_to_array(64, 4, pubkey.x);
        var pub1_array: bigint[] = bigint_to_array(64, 4, pubkey.y);
        var res = 1n;
        console.log("r: ", r, ", s: ", s);
        
        console.log(1);
        let witness = await circuit.calculateWitness({"r": r_array,
            "s": s_array,
            "msghash": msghash_array,
            "pubkey": [pub0_array, pub1_array]});
            expect(witness[1]).to.equal(res);
        console.log(1);
        await circuit.checkConstraints(witness);
    })

    return;


 
    // privkey, msghash, pub0, pub1
    var test_cases: Array<[bigint, bigint, bigint, bigint]> = [];
    var privkeys: Array<bigint> = [88549154299169935420064281163296845505587953610183896504176354567359434168161n,
                                   37706893564732085918706190942542566344879680306879183356840008504374628845468n,
                                   90388020393783788847120091912026443124559466591761394939671630294477859800601n,
                                   110977009687373213104962226057480551605828725303063265716157300460694423838923n];
    for (var idx = 0; idx < privkeys.length; idx++) {
        var pubkey: Point = Point.fromPrivateKey(privkeys[idx]);
        var msghash_bigint: bigint = 1234n;
            test_cases.push([privkeys[idx], msghash_bigint, pubkey.x, pubkey.y]);
    }



    var test_ecdsa_verify = function (test_case: [bigint, bigint, bigint, bigint]) {
        let privkey = test_case[0];
        let msghash_bigint = test_case[1];
        let pub0 = test_case[2];
        let pub1 = test_case[3];

        console.log("hash")
        var msghash: Uint8Array = bigint_to_Uint8Array(msghash_bigint);
        console.log("/hash")

        it('Testing correct sig: privkey: ' + privkey + ' msghash: ' + msghash_bigint + ' pub0: ' + pub0 + ' pub1: ' + pub1, async function() {
            console.log("runnning a test case with key", pub0)

            // in compact format: r (big-endian), 32-bytes + s (big-endian), 32-bytes
            var sig: Uint8Array = await sign(msghash, bigint_to_Uint8Array(privkey), {canonical: true, der: false})
            console.log("signed");
            var r: Uint8Array = sig.slice(0, 32);
            var r_bigint: bigint = Uint8Array_to_bigint(r);
            var s: Uint8Array = sig.slice(32, 64);
            var s_bigint:bigint = Uint8Array_to_bigint(s);

            var r_array: bigint[] = bigint_to_array(64, 4, r_bigint);
            var s_array: bigint[] = bigint_to_array(64, 4, s_bigint);
            var msghash_array: bigint[] = bigint_to_array(64, 4, msghash_bigint);
            var pub0_array: bigint[] = bigint_to_array(64, 4, pub0);
            var pub1_array: bigint[] = bigint_to_array(64, 4, pub1);
            var res = 1n;
            console.log("r: ", r, ", s: ", s);

            let witness = await circuit.calculateWitness({"r": r_array,
                                                          "s": s_array,
                                                          "msghash": msghash_array,
                                                          "pubkey": [pub0_array, pub1_array]});
            expect(witness[1]).to.equal(res);
            await circuit.checkConstraints(witness);
        });

    }
    console.log("bout to run test cases")

    test_cases.forEach(test_ecdsa_verify);
});