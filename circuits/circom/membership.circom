pragma circom 2.0.2;

include "node_modules/circom-ecdsa/circuits/zk-identity/eth.circom";
include "node_modules/circom-ecdsa/circuits/ecdsa.circom";
include "node_modules/circom-ecdsa/node_modules/circomlib/circuits/bitify.circom";
include "node_modules/circom-ecdsa/node_modules/circomlib/circuits/comparators.circom"; // TODO: fix insane dependency twiddling
include "./merkleTree.circom";

// Proves that a message is signed by one of the addresses in a merkle tree
// Essentially acts as a group signature for secp256k1
// k is the number of registers and n is their bit length
template InAddressSet(n, k, levels) {
    signal input pubkey[2][k];
    
    // Signature
    signal input r[k];
    signal input s[k];
    signal input msghash[k];

    // Merkle proof
    signal input root;
    signal input pathElements[levels];
    signal input pathIndices[levels];

    component validator = ValidateSignatureForAddress(n, k);
    for (var i = 0; i < k; i++) {
        validator.pubkey[0][i] <== pubkey[0][i];
        validator.pubkey[1][i] <== pubkey[1][i];
        validator.r[i] <== r[i];
        validator.s[i] <== s[i];
        validator.msghash[i] <== msghash[i];
    }

    // Check address is in set
    component tree = MerkleTreeChecker(levels);
    tree.leaf <== validator.address;
    tree.root <== root;
    for (var i = 0; i < levels; i++) {
        tree.pathElements[i] <== pathElements[i];
        tree.pathIndices[i] <== pathIndices[i];
    }
}

// Proves that a message is signed by an address which is not in the merkle tree
// We show that the signer's address would be between two adjacent addresses in a sorted list
// This assumes that the list is sorted, which should generally be done outside the circuit.
// If sorted is impossible, you need a different algorithm, as explained here https://crypto.stackexchange.com/a/31915
template NotInAddressSet(n, k, levels) {
    signal input pubkey[2][k];

    // Signature
    signal input r[k];
    signal input s[k];
    signal input msghash[k];

    // Merkle proofs
    signal input root;
    signal input pathElements[2][levels];
    signal input pathIndices[2][levels];
    signal input leaves[2];

    component validator = ValidateSignatureForAddress(n, k);
    for (var i = 0; i < k; i++) {
        validator.pubkey[0][i] <== pubkey[0][i];
        validator.pubkey[1][i] <== pubkey[1][i];
        validator.r[i] <== r[i];
        validator.s[i] <== s[i];
        validator.msghash[i] <== msghash[i];
    }

    // Make sure the indices are adjacent
    var belowSum = 0;
    var aboveSum = 0;
    for (var i = 0; i < levels; i++) {
        belowSum += (1 << i) * pathIndices[0][i];
        aboveSum += (1 << i) * pathIndices[1][i];
    }
    aboveSum === belowSum + 1;

    // Check both leaf addresses are in the merkle tree
    component merkleProofs[2];
    for (var i = 0; i < 2; i++) {
        merkleProofs[i] = MerkleTreeChecker(levels);
        merkleProofs[i].leaf <== leaves[i];
        merkleProofs[i].root <== root;
        for (var j = 0; j < levels; j++) {
            merkleProofs[i].pathElements[j] <== pathElements[i][j];
            merkleProofs[i].pathIndices[j] <== pathIndices[i][j];
        }
    }

    // Make sure below < signer < above
    // Range check the addresses to make sure they're 160-bit numbers (should in principle be done by the keccak circuit, but it's experimental)
    component rangeCheck[3];
    for (var i = 0; i < 3; i++) {
        rangeCheck[i] = Num2Bits(160);
    }
    rangeCheck[0].in <== leaves[0];
    rangeCheck[1].in <== validator.address;
    rangeCheck[2].in <== leaves[1];

    component lt[2];
    for (var i = 0; i < 2; i++) {
        lt[i] = LessThan(160);
    }

    lt[0].in[0] <== leaves[0];
    lt[0].in[1] <== validator.address;
    lt[0].out === 1;

    lt[1].in[0] <== validator.address;
    lt[1].in[1] <== leaves[1];
    lt[1].out === 1;
}

template ValidateSignatureForAddress(n, k) {
    signal input pubkey[2][k];

    // Signature
    signal input r[k];
    signal input s[k];
    signal input msghash[k];

    signal output address;

    // Validate public key
    component pubKeyCheck = ECDSACheckPubKey(n, k);
    for (var i = 0; i < k; i++) {
        pubKeyCheck.pubkey[0][i] <== pubkey[0][i];
        pubKeyCheck.pubkey[1][i] <== pubkey[1][i];
    }

    // Check signature
    component signatureCheck = ECDSAVerifyNoPubkeyCheck(n, k);
    for (var i = 0; i < k; i++) {
        signatureCheck.r[i] <== r[i];
        signatureCheck.s[i] <== s[i];
        signatureCheck.msghash[i] <== msghash[i];
        signatureCheck.pubkey[0][i] <== pubkey[0][i];
        signatureCheck.pubkey[1][i] <== pubkey[1][i];
    }

    // Derive address from public key
    component flatten = FlattenPubkey(n, k);
    for (var i = 0; i < k; i++) {
        flatten.chunkedPubkey[0][i] <== pubkey[0][i];
        flatten.chunkedPubkey[1][i] <== pubkey[1][i];
    }

    component pubkeyToAddress = PubkeyToAddress();
    for (var i = 0; i < 512; i++) {
        pubkeyToAddress.pubkeyBits[i] <== flatten.pubkeyBits[i];
    }
    address <== pubkeyToAddress.address;
}