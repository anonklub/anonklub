import { expose } from 'comlink'
import { hashMessage, hexToBytes, hexToSignature } from 'viem'
import type { ISpartanEcdsaWasm, ISpartanEcdsaWorker } from './interface'
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

  proveMembership({ merkleProofBytesSerialized, message, sig }): Uint8Array {
    const { r, s, v } = hexToSignature(sig)

    const sBytes = hexToBytes(s, {
      size: 32,
    })
    const rBytes = hexToBytes(r, {
      size: 32,
    })
    const isYOdd = calculateSigRecovery(v)
    const msgHash = hashMessage(message, 'bytes')

    return spartanEcdsaWasm.prove_membership(
      sBytes,
      rBytes,
      isYOdd,
      msgHash,
      merkleProofBytesSerialized,
    )
  },

  verifyMembership(anonklubProof: Uint8Array): boolean {
    return spartanEcdsaWasm.verify_membership(anonklubProof)
  },
}

expose(spartanEcdsaWorker)
