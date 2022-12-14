pragma circom 2.0.2;

include "../membership.circom";

component main {public [msghash, root]} = InAddressSet(64, 4, 2);