# The zk-ECDSA Landscape

Ethereum is a principled project, popular for being a credibly neutral payment, financial, and computing system.

Unfortunately, to achieve neutrality, it has sacrificed privacy because every transaction must be public to be verified. However, recent advances in ZKP (Zero Knowledge Proof) systems have made it practical to achieve privacy while maintaining verifiability. There are new privacy focussed ZK blockchains such as [TODO: cite Mina, Aleo, Zcash etc], but L1 development is hard and slow, especially on a large and established protocol like Ethereum. Instead of adding privacy to the underlying system, we as smart contract developers can rewrite the ecosystem to respect privacy, while keeping the L1 simple and transparent. This is the promise of zk-ECDSA.

Broadly speaking, dApps work by verifying ECDSA signatures on transactions then executing smart contract logic. Instead, we can verify ECDSA signatures and execute arbitrary logic inside ZKPs, then verify those proofs onchain, then execute our smart contract logic. Thus, without any change to Ethereum itself, we can support privacy where users want it.

This blog was written as part of a grant from the Ethereum Foundation's Privacy and Scaling Explorations team. My mandate was to explore zk-ECDSA, and contribute to ZKPs to make this vision come true.

## Use Cases

### Mixers

Mixers were one of the first widespread usecase for ZKPs on Ethereum, with Tornado Cash handling over $7B (TODO: cite). Tornado Cash prevents double spending by using an interactive nullifier, which is a special piece of data the user must hold onto to access their funds. Keeping this nullifier secure can be just as important as keeping a private key secure, but in practice it just exists in plaintext in the browser [TODO: factcheck that (surely they add more security somehow)]. This is a significant UX problem, especially for a security conscious user who has already gone to great lengths to protect their private key.

zk-ECDSA can solve this by generating a nullifier deterministically from the private key, while keeping the user private. This is a subtle problem, and existing ECDSA signatures aren't quite suitable. [PLUME nullifiers](TODO: cite) are a leading contender for this application, promising high privacy, security, and usability. [This blog](TODO: cite) is a useful introduction to them.

#### Blacklists

Uses [nullifiers 🪶](#nullifiers)

### Private Safes

Many projects use safes like [Gnosis Safe](TODO: cite) to safely control funds split between multiple parties. Generally this means using your personal key to sign votes for how the money is spent, those votes are then sent to the chain and executed when enough parties agree. However, this means publicly linking your personal finances to some project, which is generally not desirable. Instead of sending a publicly readable signature, the user can send a ZKP proving their vote without revealing their identity onchain. (TODO: link banksian's project)

Uses [nullifiers 🪶](#nullifiers)

### Private Voting

Voting on, for example, a DAO proposal (or indeed on political candidates or legislation!) should generally be done privately to prevent retribution, bribery, and collusion. Instead of collating signatures, we can collate ZKPs, provided they output a deterministic nullifier to prevent double votes.

Uses [nullifiers 🪶](#nullifiers)

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

For example, suppose you want to create some private content for Nouns (TODO: link to Nouns explanation) holders. The standard solution would be "Sign in with Ethereum", where you would verify your address, and the server could verify that you own a Noun onchain. However, this gives the website your personal financial details for that address, which may be enough to track and target you, especially since you are known to hold a valuable NFT. Instead we can create "Sign in as Noun" functionality by simply proving you own an address in the set of Nouns holders.

Uses [offchain signatures 🔗‍💥](#offchain-no-nullifiers)

## Tooling

Using zk-ECDSA is still not easy. You have to carefully choose the right library and proof system for your use case. There are two critical questions: do you need nullifiers, and do you need onchain verification? It's important to choose the right tool for your use case, because prover time can be radically improved if you don't need nullifiers or onchain verification.

Most of the work below was done at PersonaeLabs (TODO: cite) and 0xparc (TODO: cite), and as part of my grant I wrote the verifier circuit for the nullifier library.

### Merkle Tree Basics

The circuits for most applications require some kind of signature/nullifier verifcation, and set membership. Merkle trees are a simple efficient method of set membership, and a circom implementation originating from tornado cash has been well battle tested. During my grant I used a Merkle tree with the Poseidon hash, which is a hash function that's efficient in ZK circuits. [This implementation](TODO: cite), which verifies a public key, signature, and merkle proof may be instructive for your application. Note, that you should remove the public key check if unnecessary, and swap the signature verification out for the most efficient version possible for your constraints.

### Offchain, no nullifiers

The fastest way to privately verify a signature is [spartan-ecdsa](TODO: cite). It is primarily fast because it uses right-field arithmetic by using the secq256k1 curve (whose scalar field is Ethereum's familiar secp256k1's base field), but this means it has to use a proof system defined for secq256k1 such as [Spartan](TODO: cite) (note, groth16, plonk etc aren't available as they rely on pairings, which aren't available in secq256k1). Unfortunately, Spartan does not yet have an efficient verifier that runs on chain (though this is being worked on (TODO: cite)). Ultimately, this is just an way to verify ECDSA schemes in ZKPs, so, like all plain ECDSA schemes, it can't be used as a nullifier (TODO: link to nullifier section).

### Onchain, no nullifiers

A predecessor to spartan-ecdsa is [efficient-ecdsa](TODO: cite), the difference being that it uses expensive wrong-field arithmetic implemented as big integer arithmetic (TODO: true?). The current implementation is circom, which is a natural frontend to any R1CS proof system such as groth16, as well as having built in support for PlonK and fflonk, this means it can be verified on chain at minimal cost. However, the provers are much slower than spartan-ecdsa (TODO: check stats, maybe it's not minutes), requiring minutes rather than seconds in the browser.

### Nullifiers

Nullifiers are deterministic values that don't reveal one's private identity, but do prove set membership. These are necessary for financial applications to prevent double spending, in addition to private voting and pseudonymous messaging. Intuitively, an ECDSA signature should work as a nullifier, but it is not in fact deterministic on the message/private key. ECDSA signatures include a random scalar which is used to hide the private key, and even is this scalar is generated pseudorandomly, there is no way for the verifier distinguish between a deterministic and random version of the same signature. Therefore, new schemes are required. Please consult Aayush Gupta's blog (TODO: cite) for a more detailed exploration of the problem.

The only existing candidate scheme is [PLUME nullifier](TODO: cite). There is some work required to get these into wallets, and the circuits (for which I wrote the initial implementation as part of this grant (TODO: cite)) are not yet audited or production ready. Initially, they will probably take several (5 to 10) (TODO: is this real though lmao?) minutes on a regular browser.

## My Work

My grant ended up being a fairly meandering path toward the state of the art in zk-ECDSA. My main contribution, as I see it, is the [circuit for the PLUME nullifier](TODO), as well as transmitting understanding zk-ECDSA in house, and now hopefully to the outside world.

The initial exploratory work included a merkle tree based membership and non-membership proofs, and public key validation in circom using [0xparc's circom-ecdsa](TODO: link) (which is the founding project in this space). About halfway through the grant I realised how critical nullifiers are for most applications, and pivoted to working on the PLUME nullifiers.

### Membership/Non-membership proofs

The first task was to make a basic circuit that proves membership in an address set. I used a [modified version of tornado cash](TODO: cite) for the merkle proof, and [circom-ecdsa](TODO: cite) for the signature verification (because I wasn't yet aware of efficient-ecdsa or spartan-ecdsa).

We were also interested in non-membership proofs. For example, if you wanted to prove non-membership in a [blacklist](TODO: link back up to use case) for a mixer gated by regulators, you would have to prove membership in the depositor set, and non-membership in the blacklist. [I did this](TODO) with a simple sorted merkle tree, and two adjacent merkle proofs showing that the proof is not between them. I have since been [convinced](TODO: cite article) that sparse merkle trees are a more robust solution, and we intend to implement this.

### Public Key Validation

Part of the signature verification algorithm involves validating that the public key is in fact a valid point on an elliptic curve (TODO: cite Menzes et al). In previous applications this was done outside the circuit, which was possible because the full public key set was known ahead of time.

However, we were interested in use cases where developers would be able to generate arbitrary address lists, such as [gated web content](TODO). The problem is, it's non-trivial to go from an address list to a public key list, as not all addresses have some associated signature from which we can [deduce the public key](TODO: cite that this is how the public key is deduced). This means that the developers would not necessarily be able to validate the public keys for every address in the list.

The solution was to [implement public key verification inside the circuit](TODO) using primitives from circom-ecdsa. This means that any ZKP pupporting to prove membership also must be done with a valid public key.

It is not exactly clear how important this check is, and you should think about it on a case by case basis for your use case. It is probably not necessary for an anonymous message board, for example, since, the worst attack one could possibly achieve with an invalid public key is falsifying an anonymous signature. However, in order to do that, one has to know the SHA256 preimage of some address, in which case they, in practice hold secret information (the public key) which is somewhat equivalent to a private key.

More work needs to be done to characterise the cases where we need to verify the public key.

### Plume Nullifiers

Having improved our understanding, we brainstormed use cases, and found (as can be seen [above](TODO cite use cases)) that nullifiers are the limiting factor for most interesting applications.

The PLUME nullifier scheme had not been implemented yet in a zero knowledge circuit, and since I now had some experience with circom-ecdsa, I was well situated for the job. I wrote it in circom, with circom-ecdsa, ultimately ending up with 6.5 million constraints (about 2M in hashing, and 4.5M in elliptic curve operations).

This was by far the most challenging part of the grant (future grantees be warned - don't be too optimistic about what you can fit in one milestone).

One interesting bug that illustrates the frustration of circom, was when I simply wasn't getting the right final hash result out. It turned out (after many log statements) that part of the algorithm implicitly compresses a particular elliptic curve point before hashing it. This compression is so trivial in JS you barely notice it, but I ended up having to write it from scratch in [these two rather nice subcircuits](TODO).

Another subtlety was that an elliptic curve equation calculating $a/b^c$ inexplicably started giving the wrong result on ~50% of inputs for $c$. It turned out that my circom code was right, but the JS that I was comparing against took a wrong modulus, using `CURVE.p` rather than `CURVE.n`, which essentially confuses the base and scalar fields of the elliptic curve. And, since `CURVE.p` is still rather large, and the value whose modulus was being taken was quite small, the result was usually the same, which accounts for the confusing irregularity of the bug!

### Proving Server

For onchain nullifiers especially, the proving time is very high (TODO: 10m?), so we wanted to create a trusted server which would generate the proof for you. (TODO complete)

## Conclusion