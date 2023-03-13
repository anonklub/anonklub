---
sidebar_position: 1
---

# Zk-ECDSA

## Introduction

### ECDSA

A cornerstone of Ethereum blockchain internals is the use of asymmetric cryptography.  
One owes 2 keys: one is public and identifies a user: it can be looked up on chain (or rather the corresponding address). The other is used to sign messages.  
Signed messages are broadcasted and validated on chain at protocol level and/or by smart contracts (`ecrecover`) in order to authenticate users and carry out actions (transactions) on their behalf.  
The Ethereum blockchain especially relies on the ECDSA to produce and verify these signatures. Any Ethereum transaction requires building and verifying such signatures.

![default-sigram](https://i.imgur.com/YjyBDA3.png)

### ZkSNARK

These transactions are publicly observable, which is a privacy concern. To address it, ZkSNARK proving systems have been developed. ZkSNARKs allow to prove claims about the execution of arbitrary computation. Combined with relays, ZkSNARK enable the performing of on chain transactions that preserve the anonymity of the users.

### ECDSA in a SNARK?

So on one side we know that transactions requires the computation of ECDSA signatures.  
On the other side we know we can perform zero knowledge proofs of arbitrary computation in a ZkSNARK to preserve users' privacy.  
Perfect! Let's perform ECDSA computations in a SNARK...

Unfortunately it is not so easy.
Current zkSNARK proving systems rely on elliptic curves that only allow operations on "finite fields" (group of numbers represented as residues modulo a specific prime). It restricts the maximum value that can be used: zkSNARK proofs can only be 254 bits big. But ECDSA involves (elliptic curve) arithmetic on 256-bit numbers. 256 > 254...meaning overflowing issues.  
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