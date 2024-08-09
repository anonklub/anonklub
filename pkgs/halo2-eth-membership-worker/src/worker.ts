import { expose } from 'comlink'
import { hashMessage, hexToSignature } from 'viem'
import type {
  IHalo2EthMembershipWasm,
  IHalo2EthMembershipaWorker,
} from './interface'
import { calculateSigRecovery, hexToLittleEndianBytes } from './utils'

let halo2EthMembershipWasm: IHalo2EthMembershipWasm
let initialized = false

export const halo2EcdsaWorker: IHalo2EthMembershipaWorker = {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async prepare() {
    halo2EthMembershipWasm = await import('@anonklub/halo2-eth-membership')

    const wasmModuleUrl = new URL(
      '@anonklub/halo2-eth-membership/dist/index_bg.wasm',
      import.meta.url,
    )
    const response = await fetch(wasmModuleUrl)
    const bufferSource = await response.arrayBuffer()

    await halo2EthMembershipWasm.initSync(bufferSource)
    await halo2EthMembershipWasm.initPanicHook()

    if (!initialized) {
      const numThreads = navigator.hardwareConcurrency
      await halo2EthMembershipWasm.initThreadPool(numThreads)
      initialized = true
    }
  },

  proveMembership({ merkleProofBytesSerialized, message, sig }): Uint8Array {
    const { r, s, v } = hexToSignature(sig)

    const sBytes = hexToLittleEndianBytes(s, 32)
    const rBytes = hexToLittleEndianBytes(r, 32)

    const isYOdd = calculateSigRecovery(v)
    const msgHash = hashMessage(message, 'bytes')

    return halo2EthMembershipWasm.prove_membership(
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
    return halo2EthMembershipWasm.verify_membership(
      ethMembershipProof,
      instances,
    )
  },
}

expose(halo2EcdsaWorker)
