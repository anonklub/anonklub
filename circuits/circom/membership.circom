pragma circom 2.0.2;

include "node_modules/circom-ecdsa/circuits/zk-identity/eth.circom";
include "node_modules/circom-ecdsa/circuits/ecdsa.circom";
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

    component address = PubkeyToAddress();
    for (var i = 0; i < 512; i++) {
        address.pubkeyBits[i] <== flatten.pubkeyBits[i];
    }

    // Check address is in set
    component tree = MerkleTreeChecker(levels);
    tree.leaf <== address.address;
    tree.root <== root;
    for (var i = 0; i < levels; i++) {
        tree.pathElements[i] <== pathElements[i];
        tree.pathIndices[i] <== pathIndices[i];
    }
}
