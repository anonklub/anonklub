# Benchmark

## Protocol

- hardware: AMD Ryzen 7 PRO 6850U (8 x 2.7 GHz, 16 threads), 32GB RAM
- 5 measurements (`/usr/bin/time -v`) per task
  - snarkjs - witness generation: `node generated/{generate_witness,main.wasm} test/data/{input.json,witness.wtns}`
  - snarkjs - proof
    generation: `snarkjs groth16 prove generated/circuit.zkey test/data/{witness.wtns,{proof,public}.json}`
  - rapidsnark - proof
    generation: `generated/prover generated/circuit.zkey test/data/{witness.wtns,{proof,public}.json}`
- circuit: 3_069_484 non-linear constraints

## Results

|  library   |        task        | average elapsed wall clock time (s) | average maximum resident set size (Gbytes) |
| :--------: | :----------------: | :---------------------------------: | ------------------------------------------ |
|  snarkjs   | witness generation |                264.5                | 0.496                                      |
|  snarkjs   |  proof generation  |                86.0                 | 23.072                                     |
| rapidsnark |  proof generation  |            9.6 (-88.8%)             | 3.9 (-83.1%)                               |

Derived average total witness + proof generation time:

|    librarie(s)     |                       task                        | average elapsed wall clock time (s) |
| :----------------: | :-----------------------------------------------: | :---------------------------------: |
|      snarkjs       |  witness (snarkjs) + proof generation (snarkjs)   |           350.5 (5'50.5")           |
| snarkjs/rapidsnark | witness (snarkjs) + proof generation (rapidsnark) |           274.1 (4'14.1")           |
