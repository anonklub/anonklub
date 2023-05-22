import { useEffect, useState } from 'react'
import config from '#/config'
import { ProofRequest } from '@anonset/membership'
import { useAnonSet } from '@context/anonset'

export const useProofRequest = () => {
  const { anonSet } = useAnonSet()
  const [message, setMessage] = useState('')
  const [rawSignature, setRawSignature] = useState('')
  const [proofRequest, setProofRequest] = useState<ProofRequest | null>(null)

  const canSign = message !== '' && rawSignature === ''
  const canSubmit = rawSignature !== '' && anonSet?.length > 0

  useEffect(() => {
    if (message === '' || rawSignature === '' || anonSet?.length === 0) return

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
    message,
    proofRequest,
    rawSignature,
    setMessage,
    setRawSignature,
  }
}
