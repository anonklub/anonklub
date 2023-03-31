import { BigNumber, utils } from 'ethers'
import { bigintToUint8Array, memoPoseidon, ProofRequest } from '../src'
import { CircuitInput } from '../src/CircuitInput'
import { ADDRESSES, MESSAGE, RAW_SIGNATURE } from './data/constants'
import circuitInputJson from './data/input.json'

describe('CircuitInput', () => {
  let poseidon: any
  beforeAll(async () => {
    poseidon = await memoPoseidon()
  })

  const proofRequest = new ProofRequest({
    addresses: ADDRESSES,
    message: MESSAGE,
    rawSignature: RAW_SIGNATURE,
  })

  it('constructs CircuitInput Instance with right properties', async () => {
    const circuitInput = new CircuitInput({ poseidon, proofRequest })

    expect(circuitInput.pubkey).toEqual([
      [
        87242158735626210n,
        9118509622689846990n,
        7111879614972718168n,
        4357483931701226928n,
      ],
      [
        13906164694492578480n,
        2250070898773639490n,
        7072406679601814382n,
        6040241442356732475n,
      ],
    ])
    expect(circuitInput.root).toEqual(
      4838124485843201236652056075471623572291235822085534765750033139888686451461n,
    )
    expect(circuitInput.pathIndices).toEqual([
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ])
    expect(circuitInput.pathElements).toEqual([
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
      0n,
    ])
    expect(circuitInput.s).toEqual([
      16934465631743262659n,
      4083054505747038707n,
      1108497567479819121n,
      2679128935275298267n,
    ])
    expect(circuitInput.r).toEqual([
      14088259321319621315n,
      3030555755363980335n,
      2532987353383879346n,
      8319578999406727183n,
    ])
  })

  it('serializes CircuitInput Instance to JSON', () => {
    const circuitInput = new CircuitInput({ poseidon, proofRequest })
    const serialized = circuitInput.serialize()

    expect(serialized).toEqual(
      `{"root":"4838124485843201236652056075471623572291235822085534765750033139888686451461","msghash":["3281596703684917490","15365437153036280024","5381952969906945047","11663927786239962187"],"pathElements":["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"],"pathIndices":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"pubkey":[["87242158735626210","9118509622689846990","7111879614972718168","4357483931701226928"],["13906164694492578480","2250070898773639490","7072406679601814382","6040241442356732475"]],"r":["14088259321319621315","3030555755363980335","2532987353383879346","8319578999406727183"],"s":["16934465631743262659","4083054505747038707","1108497567479819121","2679128935275298267"]}`,
    )
  })

  it.only('test', () => {
    const privkeys: bigint[] = [
      88549154299169935420064281163296845505587953610183896504176354567359434168161n,
      37706893564732085918706190942542566344879680306879183356840008504374628845468n,
      90388020393783788847120091912026443124559466591761394939671630294477859800601n,
      110977009687373213104962226057480551605828725303063265716157300460694423838923n,
    ]

    const addresses = privkeys.map((priv) =>
      BigNumber.from(
        utils.computeAddress(BigNumber.from(priv).toHexString()),
      ).toBigInt(),
    )

    const privkey = privkeys[0]
    const msghash = 1234n
    const msghashArray: Uint8Array = bigintToUint8Array(msghash)
    const signingKey = new utils.SigningKey(
      BigNumber.from(privkey).toHexString(),
    )
    const signature = signingKey.signDigest(msghashArray)
    const rawSignature = utils.joinSignature(signature)
    const proofRequest = new ProofRequest({
      addresses: addresses.map((a) => a.toString()),
      message: MESSAGE,
      rawSignature,
    })
    const circuitInput = new CircuitInput({
      msghash: 1234n,
      poseidon,
      proofRequest,
    })
    expect(JSON.parse(circuitInput.serialize())).toEqual(circuitInputJson)
  })
})
