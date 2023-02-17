pragma circom 2.0.2;

include "membership.circom";

// Depth 20 merkle tree to privately prove ownership of an address in a set of size 2^20 using ECDSA
component main {public [msghash, root]} = InAddressSet(64, 4, 20);
