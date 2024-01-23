import { expose } from 'comlink'
import { ISpartanEcdsaWasm, ISpartanEcdsaWorker } from './interface'
import { hexToSignature, hexToBytes, hashMessage } from 'viem'
import { calculateSigRecovery } from './utils'

let spartanEcdsaWasm: ISpartanEcdsaWasm
let initialized = false

export const spartanEcdsaWorker: ISpartanEcdsaWorker = {
  async prepare() {
    spartanEcdsaWasm = await import('@anonklub/spartan-ecdsa-wasm')
    spartanEcdsaWasm.init_panic_hook()

    if (!initialized) {
      spartanEcdsaWasm.prepare()
      initialized = true
    }
  },

  async proveMembership({
    sig,
    message,
    merkleProofBytesSerialized,
  }): Promise<Uint8Array> {
    const { r, s, v } = hexToSignature(sig)

    const sBytes = hexToBytes(s, {
      size: 32,
    })
    const rBytes = hexToBytes(r, {
      size: 32,
    })
    const isYOdd = calculateSigRecovery(v)
    const msgHash = hashMessage(message, 'bytes')

    const proof = await spartanEcdsaWasm.prove_membership(
      sBytes,
      rBytes,
      isYOdd,
      msgHash,
      merkleProofBytesSerialized,
    )

    return proof
  },

  async verifyMembership(anonklubProof: Uint8Array): Promise<boolean> {
    const isVerified = await spartanEcdsaWasm.verify_membership(anonklubProof)

    return isVerified
  },
}

expose(spartanEcdsaWorker)
