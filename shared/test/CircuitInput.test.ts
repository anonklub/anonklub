import { CircuitInput, memoPoseidon, ProofRequest } from '../src'
import { ADDRESS, ADDRESSES, MESSAGE, RAW_SIGNATURE } from './data/constants'

describe('CircuitInput', () => {
  let poseidon: any
  beforeAll(async () => {
    poseidon = await memoPoseidon()
  })

  const proofRequest = new ProofRequest({
    addresses: [...ADDRESSES, ADDRESS],
    message: MESSAGE,
    rawSignature: RAW_SIGNATURE,
  })

  it('constructs CircuitInput Instance with right properties', async () => {
    const circuitInput = new CircuitInput({ poseidon, proofRequest })

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
    expect(circuitInput.pathElements.filter((n) => n !== 0n).length).toBe(2)
    expect(circuitInput.s.length).toBe(4)
    expect(circuitInput.s.every((n) => typeof n === 'bigint')).toBeTruthy()
    expect(circuitInput.r.length).toBe(4)
    expect(circuitInput.r.every((n) => typeof n === 'bigint')).toBeTruthy()
  })

  it('serializes CircuitInput Instance to JSON', () => {
    const circuitInput = new CircuitInput({ poseidon, proofRequest })
    const serialized = circuitInput.serialize()

    expect(serialized).toMatchInlineSnapshot(
      `"{"root":"3693811591594376479707622965248825472994015918096962392551292716110185093534","msghash":["3281596703684917490","15365437153036280024","5381952969906945047","11663927786239962187"],"pathElements":["0","10478209879401945980148876055168783548405404409166638251195683100795343340633","0","14808944420264944611752540163643857394931788910226510371187368576997376543236","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],"pathIndices":[0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"pubkey":[["87242158735626210","9118509622689846990","7111879614972718168","4357483931701226928"],["13906164694492578480","2250070898773639490","7072406679601814382","6040241442356732475"]],"r":["14088259321319621315","3030555755363980335","2532987353383879346","8319578999406727183"],"s":["16934465631743262659","4083054505747038707","1108497567479819121","2679128935275298267"]}"`,
    )
  })
})
