---
description: Verify membership zk proofs
sidebar_position: 5
---

# Verify Proofs

The verification process is much faster than the proof generation.
Therefore, you should do it yourself locally.  
You'll need the [verification_key.json](https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa/blob/main/apis/proving/test/verification_key.json) file available in our repository.

```javascript
import { execSync } from 'fs'

execSync('snarkjs groth16 verify verification_key.json public.json proof.json')
```
