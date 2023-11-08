import { ProofRequest } from '@anonklub/proof'
import { useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { config } from '#'
import { useStore } from './useStore'

export const useProofRequest = () => {
  const { isConnected } = useAccount()
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

  useEffect(() => {
    reset()
  }, [message, reset])

  const canSign = message !== '' && rawSignature === undefined && isConnected
  const canSubmit = isSuccess && anonSet !== null && proofRequest !== null

  useEffect(() => {
    if (message === '' || rawSignature === undefined || anonSet === null) return

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
    rawSignature,
    setMessage,
    signMessage,
  }
}
