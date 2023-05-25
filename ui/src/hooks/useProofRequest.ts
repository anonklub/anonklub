import { useEffect, useState } from 'react'
import { useSignMessage } from 'wagmi'
import { config } from '#'
import { ProofRequest } from '@anonset/membership'
import { useStore } from './useStore'

export const useProofRequest = () => {
  const { anonSet } = useStore()
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

  useEffect(() => {
    reset()
  }, [message, reset])

  const [proofRequest, setProofRequest] = useState<ProofRequest | null>(null)

  const canSign = message !== '' && rawSignature === undefined
  const canSubmit = isSuccess && anonSet !== null

  useEffect(() => {
    if (message === '' || rawSignature === undefined || anonSet === null)
      return

    setProofRequest(
      new ProofRequest({
        addresses: anonSet,
        message,
        rawSignature,
        url: config.urls.proveApi,
      }),
    )
  }, [canSign, canSubmit, message, rawSignature, anonSet])

  return {
    canSign,
    canSubmit,
    isError,
    isLoading,
    isSuccess,
    message,
    proofRequest,
    rawSignature,
    setMessage,
    signMessage,
  }
}
