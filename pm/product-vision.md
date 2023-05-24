[TOC]

# Zk-ECDSA

## Introduction

### ECDSA

A cornerstone of Ethereum blockchain internals is the use of asymmetric cryptography.  
One owes 2 keys: one is public and identifies a user: it can be looked up on chain (or rather the corresponding address). The other is used to sign messages.  
Signed messages are broadcasted and validated on chain at protocol level and/or by smart contracts (`ecrecover`) in order to authenticate users and carry out actions (transactions) on their behalf.  
The Ethereum blockchain especially relies on the ECDSA to produce and verify these signatures. Any Ethereum transaction requires building and verifying such signatures.

![default-sigram](https://i.imgur.com/YjyBDA3.png)

### zk-SNARK

These transactions are publicly observable, which is a privacy concern. To address it, zk-SNARK proving systems have been developed. zk-SNARKs allow to prove claims about the execution of arbitrary computation. Combined with relays, zk-SNARK enable the performing of on chain transactions that preserve the anonymity of the users.

### ECDSA in a SNARK?

So on one side we know that transactions requires the computation of ECDSA signatures.  
On the other side we know we can perform zero knowledge proofs of arbitrary computation in a zk-SNARK to preserve users' privacy.  
Perfect! Let's perform ECDSA computations in a SNARK...

Unfortunately it is not so easy.
Current zk-SNARK proving systems rely on elliptic curves that only allow operations on "finite fields" (group of numbers represented as residues modulo a specific prime). It restricts the maximum value that can be used: zk-SNARK proofs can only be 254 bits big. But ECDSA involves (elliptic curve) arithmetic on 256-bit numbers. 256 > 254...meaning overflowing issues.  
That's why the ECDSA curve is said to be not "SNARK friendly" and to involve "non-native" arithmetic which is challenging.  
This challenge is precisely what the ZK-ECDSA intends to address.

## Challenges

Performing ECDSA computation in a SNARK is the main challenge we will try to address.  
Doing will address other challenges that stemmed out of working around that challenge in the first place.  
Indeed, there already exist privacy tools and applications that leverage snarks to sucessfully preserve the anonymity of users. However they work around the ECDSA challenge by computing something else than the honest computation of an ECDSA signature itself.

For instance Tornado Cash relies on the proof of a ownwership of a note that belong to a set of unspent notes managed by a merkle tree smart contract. Some drawbacks of this solution are:

- **users having to manage a new secret**: the safe management of ones' private keys is enough of personal responsiblity already
- **managing the anonymity set[^first] with a smart contract**: this smart contract is a potential [censorship](https://home.treasury.gov/news/press-releases/jy0916) target.
  Some organizations can publicly observe who interacted which a given contract, then enforce restriction at applications levels, to effectively prevent these users from performing future transactions.
  ![tornado-cash-diagram](https://i.imgur.com/M60Tm71.png)

[^first]: Set of addresses that meet a given criteria at a given time.

Another example is [Semaphore](http://semaphore.appliedzkp.org/). Semaphore allows to make anonymous blockchain identity claims. It goes around the ECDSA-in-a-SNARK computation challenge by [creating a new identity](http://semaphore.appliedzkp.org/docs/guides/identities) whose verification process will be more SNARK friendly. So a drawback here is again **requiring the user to manage an extra secret piece.**
![sempahore-diagram](https://i.imgur.com/P4L8StW.png)

Instead the goal is to verify more directly the honest computation of ECDSA in a SNARK. By doing so we would address the 2 main drawbacks mentionned above. It would require neither a smart contract to manage an anonymity set nor the management of new secret(s) beyond one's own private key.
![goal-diagram](https://i.imgur.com/lLEY7c9.png)

### Possible applications

- **Proof of membership**: proof of owernship of the private key corresponding to an address belonging to a given group
  Ex: [Proof of Dark Forest Winner](https://github.com/jefflau/zk-identity)
- Private airdrop
- Private NFT vault
- DAOs & Governance: private voting
  Unlike [Snapshot](https://snapshot.org/) which aggregates votes off chain, perform on chain verification that a given signatures threshold has been reached.

### Similar Work - Resources

https://0xparc.org/blog/zk-ecdsa-1

## Product Vision: "Zkfy ECDSA signatures"

For users, that want to anonymously prove membership of a group on the Ethereum network, a web application would allow proving and verifying membership on a on chain group on the fly.
Unlike Mixers, it wouldn't require smart contracts to manage an anonymity set, therefore it offers greater resistance to censorship risks (see address blacklisting risk).  
Unlike [Semaphore](http://semaphore.appliedzkp.org/) or [Interep](https://interep.link/), it wouldn't require the creation of a new identiy and the management of corresponding secret, therefore offering a better UX.

### Workflow Examples

1. A user able to select the attributes that should define the anonymity set. Corresponding artifacts required to gnerate proofs and verifications are generated accordingly.
   ![](https://i.imgur.com/Kf6HtvQ.png)

2. The on chain querying to generate the anonymity set, the proof generation and the verification are performed by separate APIs that can be integrated in a web application to gate access to some content/action.
   ![](https://i.imgur.com/TGrnNdS.png)

## Technical Roadmap

1. On chain querying
   Build an API to get anonymity set (list of addresses) based on some attributes (examples: addresses that have X ETH balance, addresses that have X token balance, addresses that called function X of contract Y)
   1. Write SQL queries ([crypto_ethereum bigquery](https://cloud.google.com/blog/products/data-analytics/ethereum-bigquery-public-dataset-smart-contract-analytics) or [the graph](https://thegraph.com/en/))
   2. Build API
2. Circuits
   1. R1CS arithmetization
      1. Write [Circom2](https://docs.circom.io/) circuits for
         From scratch or reuse work of [circom-ecdsa](https://github.com/0xPARC/circom-ecdsa) or [proof of dark forest winner](https://github.com/jefflau/zk-identity/) (Trusted setup per circuit required):
         - public key derivation: $private key -> public key$
         - address derivation: $private key -> address$
         - signature verification: $(message, signature, address) -> validity$
      2. Perform local benchmark
      3. APIs
         Deploy dedicated servers for remote computation of signature zkp (proving and verification)
      4. Web App for in browser proofs
      5. Audit/format verification?
   2. Port to plonkish circuit ([halo2](https://zcash.github.io/halo2/index.html), KZG commitments, universal trusted setup)
      1. Write circuits (or re use eg [plonky2](https://github.com/mir-protocol/plonky2/tree/main/ecdsa)?)
      2. Local benchmark
      3. APIs (proving and verification)
      4. Web App for in browser proofs
