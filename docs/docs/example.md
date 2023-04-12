---
description: End to End Example
sidebar_position: 2
---

# Example

```typescript
// fetch anonymity set
const tokenAddress = '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72'
const min = 3000
const ANON_SET_API = 'https://anon-set.fly.dev'

const params = new URLSearchParams({ min, tokenAddress })

const addresses: string[] = await fetch(
  `${ANON_SET_API}/balance/ERC20?${params.toString()}`,
).then((res) => res.json())

// create proof request
const proofRequest = new ProofRequest({ addresses, message, rawSignature })

// submit proof request
const jobId: string = await proofRequest.submit()

// wait a few minutes for proof to be generated

// get result (proof and public inputs)
const { proof, public } = await proofRequest.getResult()
```
