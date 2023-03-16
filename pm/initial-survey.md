# The zk-ECDSA Landscape

Ethereum is a principled project, popular for being a credibly neutral payment, financial, and computing system.

Unfortunately, to achieve neutrality, it has sacrificed privacy because every transaction must be public to be verified. However, recent advances in ZKP (Zero Knowledge Proof) systems have made it practical to achieve privacy while maintaining verifiability. There are new privacy focussed ZK blockchains such as [TODO: cite Mina etc], but L1 development is hard and slow, especially on a large and established protocol like Ethereum. Instead of adding privacy to the underlying system, we as smart contract developers can rewrite the ecosystem to respect privacy, while keeping the L1 simple and transparent. This is the promise of zk-ECDSA.

Broadly speaking, dApps work by verifying ECDSA signatures on transactions then executing smart contract logic. Instead, we can verify ECDSA signatures and execute arbitrary logic inside ZKPs, then verify those proofs onchain, then execute our smart contract logic. Thus, without any change to Ethereum itself, we can support privacy where users want it.

This blog was written as part of a grant from the Ethereum Foundation's Privacy and Scaling Explorations team. My mandate was to explore zk-ECDSA, and contribute to ZKPs to make this vision come true.

## Use Cases

### Mixers

Mixers were one of the first widespread usecase for ZKPs on Ethereum, with Tornado Cash handling over $7B (TODO: cite). Tornado Cash prevents double spending by using an interactive nullifier, which is a special piece of data the user must hold onto to access their funds. Keeping this nullifier secure can be just as important as keeping a private key secure, but in practice it just exists in plaintext in the browser [TODO: factcheck that (surely they add more security somehow)]. This is a significant UX problem, especially for a security conscious user who has already gone to great lengths to protect their private key.

zk-ECDSA can solve this by generating a nullifier deterministically from the private key, while keeping the user private. This is a subtle problem, and existing ECDSA signatures aren't quite suitable. [PLUME nullifiers](TODO: cite) are a leading contender for this application, promising high privacy, security, and usability. [This blog](TODO: cite) is a useful introduction to them.

### Private Safes

Many projects use safes like [Gnosis Safe](TODO: cite) to safely control funds split between multiple parties. Generally this means using your personal key to sign votes for how the money is spent, those votes are then sent to the chain and executed when enough parties agree. However, this means publicly linking your personal finances to some project, which is generally not desirable. Instead of sending a publicly readable signature, the user can send a ZKP proving their vote without revealing their identity onchain. (TODO: link banksian's project)

### Private Voting

Voting on, for example, a DAO proposal (or indeed on political candidates or legislation!) should generally be done privately to prevent retribution, bribery, and collusion. Instead of collating signatures, we can collate ZKPs, provided they output a deterministic nullifier to prevent double votes.

### Private NFTs

Privacy can be used in creative ways in NFTs too. For example, you could allow any CryptoPunk holder to mint a "DarkPunk," where their original address is not linked to their original CryptoPunk. This would be done by taking a snapshot of addresses holding CryptoPunks, and gating minting by requiring a zk proof showing that you own some address in that list.
Note, any set of addresses could be used to gate minting - i.e., people who lost money in The DAO hack, or people who have burned 100+ ETH.
Similarly, a new NFT project could allow private minting. First you'd buy a ticket publicly onchain, then privately prove you are a ticket holder to mint the NFT. Note, this could probably be implemented with an interactive nullifier, but zk-ECDSA could be used to save onchain costs at the expense of prover time.

### Message Boards

zk-ECDSA will also enable off chain use cases.

Anonymity can be a useful tool for voicing controversial ideas, or going a voice to less powerful people. Suppose a DAO trying to coordinate on how to spend its treasury, political factions inevitably form, and it can be hard to oppose consensus, or it might be hard to get your voice heard. Instead of relying on a traditional message board where every message is tied to a username, you can conduct discussions anonymously, or pseudonymously using ZKPs rather than signatures directly. Traditional anonymous boards are subject to sybil attacks, but i n zk message board you have to prove membership in a group and/or prove you are using a unique deterministic pseudonym derived from your public key.

[heyanoun.xyz](https://www.heyanoun.xyz/) from PersonaeLabs is a project exploring this area.

### Gated Content

zk-ECDSA can be used as a authentication for access to web content.

For example, suppose you want to create some private content for Nouns (TODO: link to Nouns explanation) holders. The standard solution would be "Sign in with Ethereum", where you would verify your address, and the server could verify that you own a Noun onchain. However, this gives the website your personal financial details for that address, which may be enough to track and target you, especially since you are known to hold a valuable NFT. Instead we can create "Sign in as Noun" functionality by simply proving you own an address in the set of Nouns holders.

## Tooling

Using zk-ECDSA is still not easy. You have to carefully choose the right library and proof system for your use case. There are two critical questions: do you need nullifiers, and do you need onchain verification? It's important to choose the right tool for your use case, because prover time can be radically improved if you don't need nullifiers or onchain verification.

Most of the work below was done at PersonaeLabs (TODO: cite) and 0xparc (TODO: cite), and as part of my grant I wrote the verifier circuit for the nullifier library.

### Offchain, no nullifiers

The fastest way to privately verify a signature is [spartan-ecdsa](TODO: cite). It is primarily fast because it uses right-field arithmetic by using the secq256k1 curve (whose scalar field is Ethereum's familiar secp256k1's base field), but this means it has to use a proof system defined for secq256k1 such as [Spartan](TODO: cite) (note, groth16, plonk etc aren't available as they rely on pairings, which aren't available in secq256k1). Unfortunately, Spartan does not yet have an efficient verifier that runs on chain (though this is being worked on (TODO: cite)). Ultimately, this is just an way to verify ECDSA schemes in ZKPs, so, like all plain ECDSA schemes, it can't be used as a nullifier (TODO: link to nullifier section).

### Onchain, no nullifiers

A predecessor to spartan-ecdsa is [efficient-ecdsa](TODO: cite), the difference being that it uses expensive wrong-field arithmetic implemented as big integer arithmetic (TODO: true?). The current implementation is circom, which is a natural frontend to any R1CS proof system such as groth16, as well as having built in support for PlonK and fflonk, this means it can be verified on chain at minimal cost. However, the provers are much slower than spartan-ecdsa (TODO: check stats, maybe it's not minutes), requiring minutes rather than seconds in the browser.

### Nullifiers

Nullifiers are deterministic values that don't reveal one's private identity, but do prove set membership. These are necessary for financial applications to prevent double spending, in addition to private voting and pseudonymous messaging. Intuitively, an ECDSA signature should work as a nullifier, but it is not in fact deterministic on the message/private key. ECDSA signatures include a random scalar which is used to hide the private key, and even is this scalar is generated pseudorandomly, there is no way for the verifier distinguish between a deterministic and random version of the same signature. Therefore, new schemes are required. Please consult Aayush Gupta's blog (TODO: cite) for a more detailed exploration of the problem.

The only existing candidate scheme is [PLUME nullifier](TODO: cite). There is some work required to get these into wallets, and the circuits (for which I wrote the initial implementation as part of this grant (TODO: cite)) are not yet audited or production ready. Initially, they will probably take several (5 to 10) (TODO: is this real though lmao?) minutes on a regular browser.

## My Work

The initial exploratory work included a merkle tree based membership and non-membership proofs, and public key validation in circom using [0xparc's circom-ecdsa](TODO: link) (which is the founding project in this space). About halfway through the grant I realised how critical nullifiers are for most applications, and pivoted to working on the PLUME nullifier signatures.