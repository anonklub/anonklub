---
description: Create Proof Requests
sidebar_position: 3
---

# Create Proof Request

To create proofs you'll need to supply the following parameters:

- a list of `addresses` (aka anonymity set): `string[]`
- a `message`: `string`
- the `rawSignature` produced by the address you want to prove is member of the anonymity set: `string`
- the `url` of the proof generation API: `string`
  You can either run it [locally](https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa/tree/main/apis/prove) or use the hosted version at [TODO](#)

```typescript
const proofRequest = new ProofRequest({ addresses, message, rawSignature, url })
```
