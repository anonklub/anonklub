# The zk-ECDSA Landscape

Ethereum is a principled project, popular for being a credibly neutral payment, financial, and computing system.

Unfortunately, to achieve neutrality, it has sacrificed privacy because every transaction must be public to be verified. However, recent advances in ZKP (Zero Knowledge Proof) systems have made it practical to achieve privacy while maintaining verifiability. There are new privacy focussed ZK blockchains such as [Mina](https://minaprotocol.com/), [Aleo](https://www.aleo.org/) and [Zcash](https://z.cash/), but L1 development is hard and slow, especially on a large and established protocol like Ethereum. Instead of adding privacy to the underlying system, we as smart contract developers can rewrite the ecosystem to respect privacy, while keeping the L1 simple and transparent. This is the promise of zk-ECDSA.

Broadly speaking, dApps work by verifying [ECDSA signatures](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) on transactions then executing smart contract logic. Instead, we can verify ECDSA signatures and execute arbitrary logic inside ZKPs, then verify those proofs onchain, then execute our smart contract logic. Thus, without any change to Ethereum itself, we can support privacy where users want it.

This blog was written as part of a grant from the Ethereum Foundation's Privacy and Scaling Explorations team. My mandate was to explore zk-ECDSA, build applications with zk-ECDSA, and contribute to ZKPs to make this vision come true.

## Use Cases

### Mixers

Mixers were one of the first widespread usecase for ZKPs on Ethereum, with Tornado Cash handling [over $7B](https://home.treasury.gov/news/press-releases/jy0916). Tornado Cash prevents double spending by using an interactive nullifier, which is a special piece of data the user must hold onto to access their funds. Keeping this nullifier secure can be just as important as keeping a private key secure, but in practice it needs to at some point be in plaintext outside the wallet/secure enclave in order to generate the ZKP. This is a significant UX problem, especially for a security conscious user who has already gone to great lengths to protect their private key.

zk-ECDSA can solve this by generating a nullifier deterministically from the private key, while keeping the user private. This is a subtle problem, and existing ECDSA signatures aren't quite suitable. We explain the PLUME nullifier, the top contender to solve this problem, [below](#nullifiers). 

Uses [nullifiers 🪶](#nullifiers)

#### Blacklists

Financial privacy is good, but it can have downsides. The US Treasury [accused Tornado Cash](https://home.treasury.gov/news/press-releases/jy0916) of laundering over $455M of funds stolen by a US sanctioned North Korean hacker group. Tornado Cash itself was subsequently sanctioned.

There may be a middle ground, where privacy is preserved for normal users, but authorities can prevent hackers recieving their funds. The following is not an ideal scheme, as it gives authorities power to freeze funds of law abiding citizens, but it is a start.

In order to get your funds out of a compliant mixed, you must prove in a ZKP that you own an address that deposited funds, has not already retrieved their funds, and *does not belong to a blacklist*. This means having to that inside the ZKP you must provide a proof of non-membership, which is explained [below](#non-membersip)

Uses [non-membership 🚫](#non-membership)

### Private Safes

Many projects use safes like [Safe (formerly Gnosis Safe)](https://safe.global/) to safely control funds split between multiple parties. Generally this means using your personal key to sign votes for how the money is spent, those votes are then sent to the chain and executed when enough parties agree. However, this means publicly linking your personal finances to some project, which is generally not desirable. Instead of sending a publicly readable signature, the user can send a ZKP proving their vote without revealing their identity onchain. [zkShield](https://blog.ethereum.org/2023/02/14/layer-2-grants-roundup#:~:text=%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB%20User%20Experience-,Spiro%20%2D%20zkWallet,-Multi%2Dparty%20wallets) is an example of a private safe in development (TODO: link actual project).

Uses [nullifiers 🪶](#nullifiers)

### Private Voting

Voting on, for example, a DAO proposal (or indeed on political candidates or legislation!) should generally be done privately to prevent retribution, bribery, and collusion. Instead of collating signatures, we can collate ZKPs, provided they output a deterministic nullifier to prevent double votes.

Uses [nullifiers 🪶](#nullifiers)

### Airdrops

### Relays

### Private NFTs

Privacy can be used in creative ways in NFTs too. For example, you could allow any CryptoPunk holder to mint a "DarkPunk," where their original address is not linked to their original CryptoPunk. This would be done by taking a snapshot of addresses holding CryptoPunks, and gating minting by requiring a zk proof showing that you own some address in that list.
Note, any set of addresses could be used to gate minting - i.e., people who lost money in The DAO hack, or people who have burned 100+ ETH.
Similarly, a new NFT project could allow private minting. First you'd buy a ticket publicly onchain, then privately prove you are a ticket holder to mint the NFT. Note, this could probably be implemented with an interactive nullifier, but zk-ECDSA could be used to save onchain costs at the expense of prover time.

Uses [nullifiers 🪶](#nullifiers)

### Message Boards

zk-ECDSA will also enable off chain use cases.

Anonymity can be a useful tool for voicing controversial ideas, or going a voice to less powerful people. Suppose a DAO trying to coordinate on how to spend its treasury, political factions inevitably form, and it can be hard to oppose consensus, or it might be hard to get your voice heard. Instead of relying on a traditional message board where every message is tied to a username, you can conduct discussions anonymously, or pseudonymously using ZKPs rather than signatures directly. Traditional anonymous boards are subject to sybil attacks, but i n zk message board you have to prove membership in a group and/or prove you are using a unique deterministic pseudonym derived from your public key.

[heyanoun.xyz](https://www.heyanoun.xyz/) from PersonaeLabs is a project exploring this area.

Pseudonymity uses [nullifiers 🪶](#nullifiers), anonymity uses [offchain signatures 🔗‍💥](#offchain-no-nullifiers)

### Gated Content

zk-ECDSA can be used as a authentication for access to web content.

For example, suppose you want to create some private content for [Nouns NFT](https://nouns.wtf/) holders. The standard solution would be "Sign in with Ethereum", where you would verify your address, and the server could verify that you own a Noun onchain. However, this gives the website your personal financial details for that address, which may be enough to track and target you, especially since you are known to hold a valuable NFT. Instead we can create "Sign in as Noun" functionality by simply proving you own an address in the set of Nouns holders.

Uses [offchain signatures 🔗‍💥](#offchain-no-nullifiers)

## Tooling

Using zk-ECDSA is still not easy. You have to carefully choose the right library and proof system for your use case. There are two critical questions: do you need nullifiers, and do you need onchain verification? It's important to choose the right tool for your use case, because prover time can be radically improved if you don't need nullifiers or onchain verification.

Most of the work below was done at [PersonaeLabs](http://personaelabs.org/) and [0xparc](https://0xparc.org/), and as part of my grant I wrote the initial verifier circuit for the nullifier library.

### Merkle Tree Basics

The circuits for most applications require some kind of signature/nullifier verifcation, and set membership. Merkle trees are a simple efficient method of set membership, and a circom implementation originating from tornado cash has been well battle tested. During my grant I used a Merkle tree with the Poseidon hash, which is a hash function that's efficient in ZK circuits. [This implementation](https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa/blob/a5f7d6908faac1aab47e0c705bc91d4bccea1a73/circuits/circom/membership.circom#L13), which verifies a public key, signature, and merkle proof may be instructive for your application. Note, that you should remove the public key check if unnecessary, and swap the signature verification out for the most efficient version possible for your constraints.

### Non-Membership

Merkle trees don't naturally enable us to prove that an address is *not* in a given list. There are two possible modifications we can make to make this possible, and the first is [probably the best option](https://alinush.github.io/2023/02/05/Why-you-should-probably-never-sort-your-Merkle-trees-leaves.html).

The reccomended approach is using a sparse merkle tree. A sparse merkle tree of addresses contains every possible address arranged in order. Since Ethereum addresses are 160 bits, the merkle tree will be of depth 160 (note the amazing power of logarithmic complexity!), meaning merkle proofs can still be efficiently verified in a ZKP circuit. The leaves of the tree will be 1 if the address is included in the set, and 0 if it is not. So by providing a normal merkle proof that the leaf corresponding to an address is 0, we prove that the address is not in the list.

The alternative is sorting a list of addresses, and using 2 adjacent merkle proofs to show that the address's point in the list is unoccupied. This is the approach [I used](https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa/pull/76) in this grant, but I wouldn't reccomend it, due to the complexity of the circuit, and additional proof required to show that the list is sorted, which introduces [systemic complexity](https://vitalik.ca/general/2022/02/28/complexity.html).

### Offchain, no nullifiers

The fastest way to privately verify a signature is [spartan-ecdsa](https://personaelabs.org/posts/spartan-ecdsa/), with a 4 second proving time in a browser. It is primarily fast because it uses right-field arithmetic by using the secq256k1 curve (whose scalar field is Ethereum's familiar secp256k1's base field), but this means it has to use a proof system defined for secq256k1 such as [Spartan](https://github.com/microsoft/Spartan) (note, groth16, plonk etc aren't available as they rely on pairings, which aren't available in secq256k1). Unfortunately, Spartan does not yet have an efficient verifier that runs on chain (though this is being worked on). Ultimately, this is just an way to verify ECDSA schemes in ZKPs, so, like all plain ECDSA schemes, it can't be used as a [nullifier](#nullifiers).

### Onchain, no nullifiers

A predecessor to spartan-ecdsa is [efficient-ecdsa](https://personaelabs.org/posts/efficient-ecdsa-1/), the difference being that it uses expensive wrong-field arithmetic implemented as big integer arithmetic. The current implementation is circom, which is a natural frontend to any R1CS proof system such as groth16, as well as having built in support for PlonK and fflonk, this means it can be verified on chain at minimal cost. However, the prover is significantly slower than for spartan-ecdsa since with the circuit requires 163,239 constraints compared to spartan-ecdsa's astonishing 8,076. Note efficient-ecdsa is a major ~9x improvement over 0xparc's initial [circom-ecdsa](https://github.com/0xPARC/circom-ecdsa) implementation, which is achieved by computing several values outside the circuit.

### Nullifiers

Nullifiers are deterministic values that don't reveal one's private identity, but do prove set membership. These are necessary for financial applications to prevent double spending, in addition to private voting and pseudonymous messaging. Intuitively, an ECDSA signature should work as a nullifier, but it is not in fact deterministic on the message/private key. ECDSA signatures include a random scalar (known [here](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm#Signature_generation_algorithm) as $k$) which is used to hide the private key. Even if this scalar is generated pseudorandomly, there is no way for the verifier distinguish between a deterministic and random version of the same signature. Therefore, new schemes are required. [This blog](https://blog.aayushg.com/posts/nullifier) contains a more detailed exploration of the problem, including solution called PLUME.

The [PLUME nullifier](https://github.com/zk-nullifier-sig/zk-nullifier-sig) is the only existing candidate solution for this problem. There is some work required to get these into wallets, and the circuits (for which [I wrote](https://github.com/zk-nullifier-sig/zk-nullifier-sig/pull/7) the initial implementation as part of this grant) are not yet audited or production ready. PLUME's circom implementation currently has ~6.5 million constraints, and even with optimisation I suspect it will always be more expensive than efficient-ecdsa or spartan-ecdsa, as the verification equations are inherently longer.

## My Work

My grant ended up being a fairly meandering path toward the state of the art in zk-ECDSA. My main contribution, as I see it, is the [circuit for the PLUME nullifier](https://github.com/zk-nullifier-sig/zk-nullifier-sig/pull/7), as well as transmitting understanding zk-ECDSA in house, and now hopefully to the outside world.

The initial exploratory work included a merkle tree based membership and non-membership proofs, and public key validation in circom using [circom-ecdsa](https://github.com/0xPARC/circom-ecdsa) (which is the founding project in this space). About halfway through the grant I realised how critical nullifiers are for most applications, and pivoted to working on the PLUME nullifiers.

### Membership/Non-membership proofs

The first task was to make a basic circuit that proves membership in an address set. I used a [modified version](https://github.com/ChihChengLiang/poseidon-tornado) of tornado cash for the merkle proof, and circom-ecdsa for the signature verification (because I wasn't yet aware of efficient-ecdsa or spartan-ecdsa).

We were also interested in non-membership proofs for use cases like the [gated mixer](#blacklists) above. [I did this](https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa/pull/76) with a simple sorted merkle tree, and two adjacent merkle proofs showing that the proof is not between them. I have since been [convinced](https://alinush.github.io/2023/02/05/Why-you-should-probably-never-sort-your-Merkle-trees-leaves.html) that sparse merkle trees are a more robust solution, and we intend to implement this.

### Public Key Validation

Part of the signature verification algorithm involves validating that the public key is in fact a valid point on an elliptic curve ([Johnson et al 2001](https://www.cs.miami.edu/home/burt/learning/Csc609.142/ecdsa-cert.pdf) section 6.2). In previous applications this was done outside the circuit, which was possible because the full public key set was known ahead of time.

However, we were interested in use cases where developers would be able to generate arbitrary address lists, such as [gated web content](#gated-content). The problem is, it's non-trivial to go from an address list to a public key list, as not all addresses have some associated signature from which we can deduce the public key. This means that the developers would not necessarily be able to validate the public keys for every address in the list.

The solution was to [implement public key verification inside the circuit](https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa/blob/a5f7d6908faac1aab47e0c705bc91d4bccea1a73/circuits/circom/membership.circom#L138-L177) using primitives from circom-ecdsa. This means that any ZKP pupporting to prove membership also must be done with a valid public key.

It is not exactly clear how important this check is, and you should think about it on a case by case basis for your use case. It is probably not necessary for an anonymous message board, for example, since, the worst attack one could possibly achieve with an invalid public key is falsifying an anonymous signature. However, in order to do that, one has to know the SHA256 preimage of some address, in which case they, in practice hold secret information (the public key) which is somewhat equivalent to a private key.

More work needs to be done to characterise the cases where we need to verify the public key.

### Plume Nullifiers

Having improved our understanding, we brainstormed use cases, and found (as can be seen [above](#use-cases)) that nullifiers are the limiting factor for most interesting applications.

The PLUME nullifier scheme had not been implemented yet in a zero knowledge circuit, and since I now had some experience with circom-ecdsa, I was well situated for the job. I wrote it in circom, with circom-ecdsa, ultimately ending up with 6.5 million constraints (about 2M in hashing, and 4.5M in elliptic curve operations).

This was by far the most challenging part of the grant (future grantees be warned - don't be too optimistic about what you can fit in one milestone).

One interesting bug that difficulties of a low level language like circom, was when I simply wasn't getting the right final hash result out. It turned out (after many log statements) that part of the algorithm implicitly compresses a particular elliptic curve point before hashing it. This compression is so trivial in JS you barely notice it, but I ended up having to write it from scratch in [these two rather nice subcircuits](https://github.com/zk-nullifier-sig/zk-nullifier-sig/pull/7/files#diff-f59503380952aa2926ad22e3f7fcfb442043dd90242d81f70ffff91094f46d8fR243-R294).

Another subtlety was that an elliptic curve equation calculating $a/b^c$ inexplicably started giving the wrong result on ~50% of inputs for $c$. It turned out that my circom code was right, but the JS that I was comparing against took a wrong modulus, using `CURVE.p` rather than `CURVE.n`, which essentially confuses the base and scalar fields of the elliptic curve. And, since `CURVE.p` is still rather large, and the value whose modulus was being taken was quite small, the result was usually the same, which accounts for the confusing irregularity of the bug!

### Proving Server

For onchain nullifiers especially, the proving time is very high, so we wanted to create a trusted server which would generate the proof for you. However, this server must be trusted with your privacy, so it will be deprecated as proving times improve.