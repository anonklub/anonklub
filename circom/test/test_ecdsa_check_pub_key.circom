pragma circom 2.0.2;

include "../ecdsa.circom";

component main {public [pubkey]} = ECDSACheckPubKey(64, 4);
