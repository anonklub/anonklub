import { expose } from 'comlink'
import { hashMessage, hexToSignature } from 'viem'
import type { IHalo2EthMembershipWasm, IHalo2EthMembershipWorker, VerifyInputs } from './interface'
import { calculateSigRecovery, fetchKzgParams, hexToLittleEndianBytes } from './utils'

let halo2EthMembershipWasm: IHalo2EthMembershipWasm
let initialized = false
let params: Uint8Array

export const Halo2EthMembershipWorker: IHalo2EthMembershipWorker = {
  async prepare() {
    halo2EthMembershipWasm = await import('@anonklub/halo2-eth-membership')

    const wasmModuleUrl = new URL(
      '@anonklub/halo2-eth-membership/dist/index_bg.wasm',
      import.meta.url,
    )
    const response = await fetch(wasmModuleUrl)
    const bufferSource = await response.arrayBuffer()

    halo2EthMembershipWasm.initSync(bufferSource)
    halo2EthMembershipWasm.initPanicHook()

    if (!initialized) {
      const numThreads = navigator.hardwareConcurrency
      await halo2EthMembershipWasm.initThreadPool(numThreads)

      // Please note that K = 14 only supported for now until benchmarking is finished
      params = await fetchKzgParams(14)

      initialized = true
    }
  },

  async proveMembership({ merkleProofBytesSerialized, message, sig }): Promise<Uint8Array> {
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
      params,
    )
  },

  async verifyMembership(membershipProofSerialized: VerifyInputs): Promise<boolean> {
    // Please note that K = 15 only supported for now until benchmarking is finished
    const params = await fetchKzgParams(15)

    return halo2EthMembershipWasm.verify_membership(
      membershipProofSerialized,
      params,
    )
  },
}

expose(Halo2EthMembershipWorker)
