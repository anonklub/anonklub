import { expose } from 'comlink'
import { hashMessage, hexToBytes, hexToSignature } from 'viem'
import type { IHalo2EthMembershipaWorker, IHalo2EthMembershipWasm } from './interface'
import { calculateSigRecovery } from './utils'

let halo2EcdsaWasm: IHalo2EthMembershipWasm
let initialized = false

export const halo2EcdsaWorker: IHalo2EthMembershipaWorker = {
  async prepare(num_threads: number) {
    halo2EcdsaWasm = await import('@anonklub/halo2-eth-membership')
    halo2EcdsaWasm.initPanicHook()

    if (!initialized) {
      await halo2EcdsaWasm.initThreadPool(num_threads)
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

    return halo2EcdsaWasm.prove_membership(
      sBytes,
      rBytes,
      isYOdd,
      msgHash,
      merkleProofBytesSerialized,
    )
  },

  verifyMembership(
    ethMembershipProof: Uint8Array,
    instances: Uint8Array,
  ): boolean {
    return halo2EcdsaWasm.verify_membership(ethMembershipProof, instances)
  },
}

expose(halo2EcdsaWorker)
