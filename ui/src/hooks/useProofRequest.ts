import { ProofRequest } from '@anonklub/proof'
import { useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { config } from '#'
import { useMerkleTreeWasmWorker } from './useMerkleTreeWorker'
import { useStore } from './useStore'

export const useProofRequest = () => {
  const { address, isConnected } = useAccount()
  const { anonSet, proofRequest, setProofRequest } = useStore()
  const [message, setMessage] = useState('')
  const {
    data: rawSignature,
    isError,
    isLoading,
    isSuccess,
    reset,
    signMessage,
  } = useSignMessage({
    message,
  })
  const { generateMerkleProof } = useMerkleTreeWasmWorker()

  useEffect(() => {
    reset()
  }, [message, reset])

  const canSign = message !== '' && rawSignature === undefined && isConnected
  const canSubmit = isSuccess && anonSet !== null && proofRequest !== null

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      if (
        message === '' ||
        typeof rawSignature === 'undefined' ||
        anonSet === null ||
        typeof address === 'undefined'
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
  }, [canSign, canSubmit, message, rawSignature, anonSet])

  return {
    canSign,
    canSubmit,
    isError,
    isLoading,
    isSuccess,
    message,
    rawSignature,
    setMessage,
    signMessage,
  }
}
