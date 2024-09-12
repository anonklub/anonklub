import { expose } from 'comlink'
import { hashMessage, hexToSignature } from 'viem'
import type { IHalo2EthMembershipWasm, IHalo2EthMembershipWorker } from './interface'
import { calculateSigRecovery, fetchKzgParams, hexToLittleEndianBytes } from './utils'

let halo2EthMembershipWasm: IHalo2EthMembershipWasm
let initialized = false

export const Halo2EthMembershipWorker: IHalo2EthMembershipWorker = {
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

  async proveMembership({ merkleProofBytesSerialized, message, sig, k }): Promise<Uint8Array> {
    const { r, s, v } = hexToSignature(sig)

    const sBytes = hexToLittleEndianBytes(s, 32)
    const rBytes = hexToLittleEndianBytes(r, 32)

    const isYOdd = calculateSigRecovery(v)
    const msgHash = hashMessage(message, 'bytes')

    const params = await fetchKzgParams(k)

    return halo2EthMembershipWasm.prove_membership(
      sBytes,
      rBytes,
      isYOdd,
      msgHash,
      merkleProofBytesSerialized,
      params,
    )
  },

  async verifyMembership({ membershipProofSerialized, k }): Promise<boolean> {
    const params = await fetchKzgParams(k)

    return halo2EthMembershipWasm.verify_membership(
      membershipProofSerialized,
      params,
    )
  },
}

expose(Halo2EthMembershipWorker)
