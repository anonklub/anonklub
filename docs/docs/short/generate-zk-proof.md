---
description: Generate membership zk proofs
position: 4
---

# Generate Proofs
Once you have a proof request, you can generate a proof either locally or by relying on our remote proof server.

| Server | Pros                                         | Cons                                           |
|--------|----------------------------------------------|------------------------------------------------|
| Remote | No need to install circom or snarkjs. Faster | You need to trust our server                   |
| Local  | Trustless                                    | You need to install circom and snarkjs, Slower |

## Remote
```javascript
const jobId = await fetch('https://anonset.xyz/proof', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: proofRequest.serialize(),
}).then((res) => res.json());

// wait for proof to be generated (5 - 10 minutes)
const proof = await fetch(`https://anonset.xyz/proofs/${jobId}/proof.json`).then((res) =>
  res.json()
)
const publicSignals = await fetch(`https://anonset.xyz/proofs/${jobId}/public.json`).then(
  (res) => res.json()
)
```

## Local
You'll need the circom generate files. You can either re-generate them yourself or download them from our [github repo](https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa/tree/main/apis/proving/generated).

```javascript
import { execSync, readFileSync, writeFileSync } from 'fs'

const circuitInput = new CircuitInput(proofRequest)

execSync('node ./generate_witness.js ./main.wasm ./input.json ./witness.wtns')
execSync('snarkjs groth16 prove ./circuit_0001.zkey ./witness.wtns ./proof.json ./public.json')

const proof = JSON.parse(fs.readFileSync('./proof.json', 'utf8'))
const publicSignals = JSON.parse(fs.readFileSync('./public.json', 'utf8'))
```