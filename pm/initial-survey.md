# The zk-ECDSA Landscape

Ethereum is a principled project, popular for being a credibly neutral payment, financial, and computing system.

Unfortunately, to achieve neutrality, it has sacrificed privacy because every transaction must be public to be verified. However, recent advances in ZKP (Zero Knowledge Proof) systems have made it practical to achieve privacy while maintaining verifiability. There are new privacy focussed ZK L1s such as [TODO: cite Mina etc], but L1 development is hard and slow, especially on a large and established protocol like Ethereum. Instead, as smart contract developers, we can rewrite the ecosystem to respect privacy, while keeping the L1 simple and transparent. This is the promise of zk-ECDSA.

Broadly speaking, dApps work by verifying ECDSA signatures on transactions then executing smart contract logic. Instead, we can verify ECDSA signatures and execute arbitrary logic inside ZKPs, then verify those proofs onchain, then execute our smart contract logic. Thus, without any change to Ethereum itself, we can support privacy where users want it.

## Use Cases

### Mixers

Mixers were one of the first widespread usecase for ZKPs on Ethereum, with Tornado Cash handling over $7B (TODO: cite). Tornado Cash prevents double spending by using an interactive nullifier, which is a special piece of data the user must hold onto to access their funds. Keeping this nullifier secure can be just as important as keeping a private key secure, but in practice it just exists in plaintext in the browser [TODO: factcheck that (surely they add more security somehow)]. This is a significant UX problem, especially for a security conscious user who has already gone to great lengths to protect their private key.

zk-ECDSA can solve this by generating a nullifier deterministically from the private key, while keeping the user private. This is a subtle problem, and existing ECDSA signatures aren't quite suitable. [PLUME nullifiers](TODO: cite) are a leading contender for this application, promising high privacy, security, and usability. [This blog](TODO: cite) is a useful introduction to them.

### Private Safes

Many projects use safes like [Gnosis Safe](TODO: cite) to safely control funds split between multiple parties. Generally this means using your personal key to sign votes for how the money is spent, those votes are then sent to the chain and executed when enough parties agree. However, this means publicly linking your personal finances to some project, which is generally not desirable. Instead of sending a publicly readable signature, the user can send a ZKP proving their vote without revealing their identity onchain. (TODO: link banksian's project)

### Private Voting

Voting on, for example, a DAO proposal (or indeed in a election or legislature!) should generally be done privately to prevent retribution, bribery, and collusion. Instead of collating signatures, we can collate ZKPs, provided they output a deterministic nullifier.

### Private NFTs



### Message Boards

zk-ECDSA will also enable off chain use cases.

Anonymity can be a useful tool for voicing controversial ideas, or going a voice to less powerful people. Suppose a DAO trying to coordinate on how to spend its treasury, political factions inevitably form, and it can be hard to oppose consensus, or it might be hard to get your voice heard. Instead of relying on a traditional message board where every message is tied to a username, you can conduct discussions anonymously, or pseudonymously using ZKPs rather than signatures directly. Traditional anonymous boards are subject to sybil attacks, but i n zk message board you have to prove membership in a group and/or prove you are using a unique deterministic pseudonym derived from your public key.

[heyanoun.xyz](https://www.heyanoun.xyz/) from PersonaeLabs is a project exploring this area.

### Gated Content

## Implementation Details

Using zk-ECDSA is still not easy. You have to carefully choose the right library and proof system for your use case. PersonaeLabs has produced much of the recent research in this area, and all the libraries I'm going to reccomend were came from them.

### Offchain, no nullifiers

The fastest way to privately verify a signature is [spartan-ecdsa](TODO: cite). It is primarily fast because it uses right-field arithmetic by over the secq256k1 curve, but this means it has to use a proof system defined for secq256k1 such as [Spartan](TODO: cite) (note, groth16, plonk, STARKs etc aren't available). Unfortunately, Spartan does not yet have an efficient verifier that runs on chain. Furthermore, this is a way of verifying non-deterministically generated signatures in zero knowledge, which means that it can't be used as a nullifier.

### Onchain, no nullifiers

A predecessor to spartan-ecdsa is [efficient-ecdsa](TODO: cite), the difference being that it uses expensive wrong-field arithmetic implemented as as big integer arithmetic (TODO: true?). The current implementation is circom, which is a natural frontend to any R1CS proof system such as groth16, as well as having build in support for PlonK and fflonk, this means it can be verified on chain at minimal cost. However, the provers are much slower than spartan-ecdsa (TODO: check stats, maybe it's not minutes), requiring minutes rather than seconds in the browser.

### Nullifiers

The only deterministic scheme at the moment are [PLUME nullifier](TODO: cite). There is some work required to get these into wallets, and the circuits (which, incidentally, I was involved in writing as part of this grant), are not yet audited and production ready. Initially, they will probably take several (5 to 10) (TODO: is this real though lmao?) minutes on a regular browser.

## My Work

This blog was written as part of a grant from the Ethereum Foundation. My mandate was to explore zkECDSA and work towards implementing projects such as those outlined above. The initial exploratory work included a merkle tree based membership and non-membership proofs, and public key validation in circom using [0xparc's circom-ecdsa](TODO: link) (which is the founding project in this space). About halfway through the grant I realised how critical nullifiers are for most applications, and pivoted to working on the PLUME nullifier signatures.