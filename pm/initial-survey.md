# The zk-ECDSA Landscape

Ethereum is a principled project, popular for being a credibly payment, financial, and computing system.

Unfortunately, to achieve neutrality, it has sacrificed privacy because every transaction must be public to be verified. However, recent advances in ZKP (Zero Knowledge Proof) systems have made it practical to achieve privacy while maintaining verifiability. As smart contract developers, we can rewrite the ecosystem to respect privacy, while keeping the L1 simple and transparent. This is the promise of zk-ECDSA.

Broadly speaking, dApps work by verifying ECDSA signatures on transactions then executing smart contract logic. Instead, we can verify ECDSA signatures and execute arbitrary logic inside zk-SNARKs, then verify those SNARKs onchain, then execute our smart contract logic. Thus, without any change to Ethereum itself, we can support privacy where users want it.

## Use Cases

Message Boards.
Mixers.
Private Safes.
Private Voting.
Private NFTs.

## Challenges

Prover time.
Verifier time.
Nullifiers.