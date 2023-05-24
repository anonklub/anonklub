---
sidebar_position: 5
---

# Roadmap

The current version of Anon Klub is a proof of concept and has major drawbacks in due to its implementation details. **The ZKPs it generates should not be used for production systems.** However, new systems are being built that will make Anon Klub far more efficient and secure.

In particular, the current version uses:
 - groth16 proofs over the bn128 curve
 - **An unsafe CRS**
 - Standard secp256k1 ECDSA signature verification
 - Merkle trees for set membership

The most serious issue is that we're using groth16, and haven't done a ceremony for the trusted setup. By using this system you're trusting that [blakemscurr](https://github.com/blakemscurr) deleted the toxic waste correctly. Note that an untrusted setup is not just a privacy issue, but also a soundness issue - he may be able to generate false proofs that the verifier will accept, and potentially steal from your system!

Groth16 proofs can be cheaply verified onchain, but proving is inefficient. Our current proofs take ~10 minutes to generate on a reasonably powerful server, which is why we have a dedicated server where users can generate their proofs. This, of course, means users either have to run an expensive procedure themselves, or trust us with their privacy.

Standard secp256k1 signature verification has two problems: it's non-deterministic, and it's not the most efficient. Non-determinism is imporant for systems that require nullifiers, and is fixed with PLUME which is [discussed below](#plume). Spartan-ecdsa (also [discussed below](#spartan-ecdsa)) uses a more efficient verifier but is also non-deterministic.

Merkle trees are a simple and useful accumulator, but other accumulators have better properties. For example, Caulk has cheaper insertions making which saves significant gas costs for mixers.

## Future Plans

In the future, Anon Klub will support two types of signatures: nullifiers, and plain signaures. Nullifiers are needed for many kinds of financial applications such as mixers, and plain signatures are more efficient if nullifiers aren't needed.

### PLUME

[PLUME](https://github.com/zk-nullifier-sig/zk-nullifier-sig) is the leading candidate for ECDSA nullifiers. The only existing implementation of a PLUME circuit has over 4 million constraints, making it worse than even a naive signature circuit. We are currently working on a PLUME implementation in Halo2 which will significantly improve prover time, and other teams are working on wallet integration for PLUME. Once these are complete, Anon Klub will implement user friendly set membership for PLUME nullifiers.

### Spartan-ecdsa

[Spartan-ecdsa](https://github.com/personaelabs/spartan-ecdsa) is, to our knowledge, the most efficient method for zk-ECDSA. It is already useful in offchain applications, and we intend to implement it in Anon Klub soon for that reason. It uses the [Spartan](https://github.com/microsoft/Spartan) proving system, which doesn't have efficient onchain verification, but that is [in the works](https://github.com/personaelabs/spartan-ecdsa/tree/hoplite).