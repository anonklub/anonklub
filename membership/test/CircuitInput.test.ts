import { CircuitInput, getMemoPoseidon } from '../src'
import { addresses, message, rawSignature } from './data/constants'

describe('CircuitInput', () => {
  let poseidon: any
  beforeAll(async () => {
    poseidon = await getMemoPoseidon()
  })

  let circuitInput: CircuitInput
  beforeEach(() => {
    circuitInput = new CircuitInput({
      field: poseidon.F,
      hashFunction: poseidon,
      proofRequest: { addresses, message, rawSignature },
    })
  })

  it('constructs circuit input', async () => {
    expect(circuitInput.msghash.length).toBe(4)
    expect(
      circuitInput.msghash.every((n) => typeof n === 'bigint'),
    ).toBeTruthy()
    expect(circuitInput.pubkey.length).toBe(2)
    circuitInput.pubkey.forEach((arr) => {
      expect(arr.length).toBe(4)
      expect(arr.every((n) => typeof n === 'bigint')).toBeTruthy()
    })
    expect(typeof circuitInput.root === 'bigint').toBeTruthy()
    expect(circuitInput.pathIndices.length).toBe(20)
    expect(
      circuitInput.pathIndices.every((n) => typeof n === 'number'),
    ).toBeTruthy()
    expect(circuitInput.pathElements.length).toBe(20)
    expect(
      circuitInput.pathElements.every((n) => typeof n === 'bigint'),
    ).toBeTruthy()
    expect(circuitInput.pathElements.filter((n) => n !== 0n).length).not.toBe(0)
    expect(circuitInput.s.length).toBe(4)
    expect(circuitInput.s.every((n) => typeof n === 'bigint')).toBeTruthy()
    expect(circuitInput.r.length).toBe(4)
    expect(circuitInput.r.every((n) => typeof n === 'bigint')).toBeTruthy()
  })

  it('serializes circuit input converting all values as strings', () => {
    const serialized = circuitInput.serialize()
    expect(serialized).toMatchInlineSnapshot(
      `"{"pubkey":[["134162796521453530","8298045892481668376","4678681870539125859","7673344007131002543"],["16096313293593602990","8437262215017434301","4136444546619680567","14991233229785250901"]],"msghash":["1106885009253421579","96029214359583495","3509431733003365818","4036994247280680794"],"root":"14633253032606695569828280063195761690745236471910018934245566338060136571917","pathIndices":["0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],"pathElements":["1041192336744601337440078593269903282235209198075","8809661606614252375181436236765425255436448209055728326727440858363194972945","3560051442851960409099673150238826738190920694567337457559225522353906331292","17416457613824043542588649838416227540440995038452370701824660833527835598763","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],"s":["12597181075936389041","3365156248504414764","14471228063225523049","598831144745010982"],"r":["4510987055452870476","3923628489191494989","6304859338697760977","1037869931997096589"]}"`,
    )

    const parsed = JSON.parse(serialized)
    expect(
      parsed.pubkey.every((arr: any) =>
        arr.every((n: unknown) => typeof n === 'string'),
      ),
    ).toBeTruthy()
    expect(
      parsed.msghash.every((n: unknown) => typeof n === 'string'),
    ).toBeTruthy()
    expect(typeof parsed.root === 'string').toBeTruthy()
    expect(
      parsed.pathIndices.every((n: unknown) => typeof n === 'string'),
    ).toBeTruthy()
    expect(
      parsed.pathElements.every((n: unknown) => typeof n === 'string'),
    ).toBeTruthy()
    expect(parsed.s.every((n: unknown) => typeof n === 'string')).toBeTruthy()
    expect(parsed.r.every((n: unknown) => typeof n === 'string')).toBeTruthy()
  })
})
