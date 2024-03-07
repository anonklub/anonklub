import { ProofRequest } from '@anonklub/proof'
import { useEffect, useState } from 'react'
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
    // TODO: use an errors array and push the potential signature error and merkle tree error to it, render everything in the ErrorContainer
    // error,
    isSuccess,
    signMessage,
  } = useSignMessage({
    message,
  })
  const [isGeneratingMerkleProof, setIsGeneratingMerkleProof] = useState(false)
  const { generateMerkleProof, isWorkerReady } = useMerkleTreeWasmWorker()
  const [merkleProofError, setMerkleProofError] = useState<string | null>(null)

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

      setIsGeneratingMerkleProof(true)

      try {
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
      } catch (error) {
        setMerkleProofError(error)
      } finally {
        setIsGeneratingMerkleProof(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isWorkerReady, message, rawSignature, anonSet])

  return {
    canSign,
    canSubmit,
    isGeneratingMerkleProof,
    merkleProofError,
    isSuccess,
    rawSignature,
    signMessage,
  }
}
