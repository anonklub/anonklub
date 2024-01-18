import { ProofRequest } from '@anonklub/proof'
import { useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { config } from '#'
import { useStore } from './useStore'
import { useMerkleTreeWasmWorker } from './useMerkleTreeWorker'

export const useProofRequest = () => {
  const { isConnected, address } = useAccount()
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
  const { generateMerkleProof } = useMerkleTreeWasmWorker();

  useEffect(() => {
    reset()
  }, [message, reset])

  const canSign = message !== '' && rawSignature === undefined && isConnected
  const canSubmit = isSuccess && anonSet !== null && proofRequest !== null

  useEffect(() => {
    (async () => {
      if (message === '' || rawSignature === undefined || anonSet === null || !address) return

      const merkleProofBytes = await generateMerkleProof(
        anonSet,
        address.toLowerCase(),
        15
      );

      setProofRequest(
        new ProofRequest({
          addresses: anonSet,
          message,
          merkleProof: merkleProofBytes,
          rawSignature,
          url: config.urls.proveApi,
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