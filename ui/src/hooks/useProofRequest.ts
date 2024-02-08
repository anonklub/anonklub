import { ProofRequest } from '@anonklub/proof'
import { useEffect } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { config } from '#'
import { useMerkleTreeWasmWorker } from './useMerkleTreeWorker'
import { useStore } from './useStore'

const { message } = config

export const useProofRequest = () => {
  const { address, isConnected } = useAccount()
  const { anonSet, proofRequest, setProofRequest } = useStore()
  const {
    data: rawSignature,
    isError,
    isLoading,
    isSuccess,
    signMessage,
  } = useSignMessage({
    message,
  })
  const { generateMerkleProof, isWorkerReady } = useMerkleTreeWasmWorker()

  const canSign = rawSignature === undefined && isConnected
  const canSubmit = isSuccess && anonSet !== null && proofRequest !== null

  useEffect(() => {
    void (async () => {
      if (
        typeof rawSignature === 'undefined' ||
        anonSet === null ||
        typeof address === 'undefined' ||
        !isWorkerReady
      )
        return

      const merkleProofBytes = await generateMerkleProof(
        anonSet,
        address.toLowerCase(),
        15,
      )

      setProofRequest(
        new ProofRequest({
          addresses: anonSet,
          merkleProof: merkleProofBytes,
          message,
          rawSignature,
        }),
      )
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    canSign,
    canSubmit,
    isWorkerReady,
    message,
    rawSignature,
    anonSet,
  ])

  return {
    canSign,
    canSubmit,
    isError,
    isLoading,
    isSuccess,
    rawSignature,
    signMessage,
  }
}
