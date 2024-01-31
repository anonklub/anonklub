pragma circom 2.0.0;

include "../merkleTree.circom";

component main {public [leaf, root, pathElements, pathIndices]} = MerkleTreeChecker(2);
