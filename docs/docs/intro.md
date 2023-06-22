---
sidebar_position: 1
title: Introduction
---

# Zk-ECDSA

## Introduction

### ECDSA

A cornerstone of Ethereum blockchain internals is the use of asymmetric cryptography, specifically the Elliptic Curve Digital Signature Algorithm (ECDSA). In this system, a user possesses two keys: a public key, which identifies the user and can be looked up on-chain, and a private key, which is used to sign messages. These signed messages are broadcasted and validated on-chain at the protocol level and/or by smart contracts (ecrecover) to authenticate users and carry out actions (transactions) on their behalf. Any Ethereum transaction requires the building and verification of such signatures.

![default-sigram](https://i.imgur.com/YjyBDA3.png)

### zk-SNARK

However, Ethereum transactions are publicly observable, which raises privacy concerns. To address this, zk-SNARK proving systems have been developed. zk-SNARKs allow the proof of claims about the execution of arbitrary computation. Combined with relays, zk-SNARKs enable the execution of on-chain transactions that preserve the anonymity of the users.

On one side, we know that transactions require the computation of ECDSA signatures. On the other side, we know we can perform zero-knowledge proofs of arbitrary computation in a zk-SNARK to preserve users' privacy. The solution? Perform ECDSA computations in a SNARK.

### ECDSA in a SNARK?

In the context of decentralized applications (dApps), this approach adds an extra layer of logic to our smart contracts. Instead of directly verifying signatures, we can verify ECDSA signatures and execute arbitrary logic inside ZKPs, then verify those proofs on-chain, and finally execute our smart contract logic. This method allows us to support privacy on-chain with existing ECDSA keys for Ethereum addresses, without any change to Ethereum itself. This offers a promising avenue for supporting privacy where users want it, leveraging the millions of ECDSA keys ready to be utilized.

## Challenges

Current zk-SNARK proving systems are based on elliptic curves that only allow operations on "finite fields". A finite field, in mathematical terms, is a set or group of numbers where addition, subtraction, multiplication, and division (excluding division by zero) are defined and yield results that remain within the set. In the context of zk-SNARKs, these finite fields are represented as residues modulo a specific prime number.

This characteristic of finite fields restricts the maximum value that can be used in zk-SNARK proofs to 254 bits. However, ECDSA involves arithmetic on 256-bit numbers when working with elliptic curves. 256 > 254 ... meaning overflowing issues.

This is why the ECDSA curve is said to be not "SNARK friendly" and to involve "non-native" arithmetic. This challenge is precisely what the zk-ECDSA intends to address.

### Examples

Performing ECDSA computation in a SNARK will solve many issues of existing privacy tools that use workarounds rather than zk-ECDSA. These tools leverage SNARKs to sucessfully preserve the anonymity of users, but have security and privacy tradeoffs.

For instance, Tornado Cash relies on proof of ownwership of a note that belongs to a set of unspent notes managed by a merkle tree smart contract. Some drawbacks of this solution are:

- **users having to manage a new secret**: the safe management of one's private keys is enough personal responsibility already
- **managing the anonymity set [^first] with a smart contract**: this smart contract is a potential [censorship](https://home.treasury.gov/news/press-releases/jy0916) target.
  Some organizations can publicly observe who interacted with given contract, then enforce restriction at applications levels to effectively prevent these users from performing future transactions.
  ![tornado-cash-diagram](https://i.imgur.com/M60Tm71.png)

[^first]: Set of addresses that meet a given criteria at a given time.

Another example is [Semaphore](http://semaphore.appliedzkp.org/). Semaphore allows users to make anonymous blockchain identity claims. It avoids the ECDSA-in-a-SNARK computation challenge by [creating a new identity](http://semaphore.appliedzkp.org/docs/guides/identities) whose verification process will be more SNARK friendly. So a drawback here is, again, **requiring the user to manage an extra secret.**
![sempahore-diagram](https://i.imgur.com/P4L8StW.png)

The goal here is to more directly verify the honest computation of ECDSA in a SNARK. By doing so we would address the two main drawbacks mentioned above. It would require neither a smart contract to manage an anonymity set nor the management of new secret(s) beyond one's own private key.
![goal-diagram](https://i.imgur.com/lLEY7c9.png)

### Possible applications

- **Proof of membership**: proof of ownership of the private key corresponding to an address belonging to a given group
  Ex: [Proof of Dark Forest Winner](https://github.com/jefflau/zk-identity)
- Private airdrop
- Private NFT vault
- DAOs & Governance: private voting
  Unlike [Snapshot](https://snapshot.org/) which aggregates votes off chain, perform on chain verification that a given signatures threshold has been reached.

### Similar Work - Resources

[0xparc's blog explaining their initial implementation of zk-ECDSA](https://0xparc.org/blog/zk-ecdsa-1)

[PSE's e2e-zk-ecdsa's review of the zk-ECDSA landscape](https://mirror.xyz/privacy-scaling-explorations.eth/djxf2g9VzUcss1e-gWIL2DSRD4stWggtTOcgsv1RlxY)

## Product Vision: "Zkfy ECDSA signatures"

For users that want to anonymously prove membership of a group on the Ethereum network, a web application would allow proving and verifying membership in a on-chain group on the fly.
Unlike Mixers, it wouldn't require smart contracts to manage an anonymity set, therefore offering greater resistance to censorship risks (see address blacklisting risk).  
Unlike [Semaphore](http://semaphore.appliedzkp.org/) or [Interep](https://interep.link/), it wouldn't require the creation of a new identity and the management of a corresponding new secret, therefore offering a better UX.

### Workflow Examples

1. A user is able to select the attributes that define the anonymity set. Corresponding artifacts required to generate proofs and verifications are generated accordingly.
   ![](https://i.imgur.com/Kf6HtvQ.png)

2. The on-chain querying to generate the anonymity set, the proof generation and the verification are performed by separate APIs that can be integrated in a web application to gate access to some content/action.
   ![](https://i.imgur.com/TGrnNdS.png)
