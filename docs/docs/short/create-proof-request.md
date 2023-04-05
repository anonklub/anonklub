---
description: Create Proof Requests
position: 3
---

# Create Proof Request
To create proofs you'll need to supply the following parameters:
- a list of addresses (aka anonymity set): `string[]`
- a message: `string`
- the raw signature produced by the address you want to prove is member of the anonymity set: `string`

```javascript
const proofRequest = new ProofRequest({addresses, message, rawSignature,  })
```