---
description: Generate membership zk proofs
sidebar_position: 4
---

# Generate Proofs

Once you have a proof request, you can generate a proof either locally or by relying on our remote proof server.

| Server | Pros                                         | Cons                                                                                                                                 |
| ------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Remote | No need to install circom or snarkjs. Faster | You need to trust our server with your privacy                                                                                                        |
| Local  | Trustless                                    | You need to install circom and snarkjs. Slower. Need to tweak system partitions to allow for more swap memory on "regular" machines. |

## Remote

```typescript
const jobId = await proofRequest.submit()
```

## Local

You'll need the circom generated files. You can either re-generate them yourself or download them from our [github repo](https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa/tree/main/apis/proving/generated).

```javascript
import { execSync, readFileSync, writeFileSync } from 'fs'

const circuitInput = new CircuitInput(proofRequest)

execSync('node ./generate_witness.js ./main.wasm ./input.json ./witness.wtns')
execSync(
  'snarkjs groth16 prove ./circuit_0001.zkey ./witness.wtns ./proof.json ./public.json',
)

const proof = JSON.parse(fs.readFileSync('./proof.json', 'utf8'))
const publicSignals = JSON.parse(fs.readFileSync('./public.json', 'utf8'))
```
