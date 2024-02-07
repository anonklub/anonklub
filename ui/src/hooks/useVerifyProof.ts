import { useEffect } from 'react'
import { GetFunctionArgs } from 'viem'
import { useContractRead } from 'wagmi'
import { abi, bigintify, config } from '#'
import { useAsync, useStore } from '@/hooks'

const { groth16 } = require('snarkjs')

export const useVerifyProof = () => {
  const { proof, publicSignals } = useStore()

  const {
    data,
    error: errorSnarkJs,
    execute,
    isLoading: isLoadingSnarkJs,
  } = useAsync<string>(async () =>
    groth16.exportSolidityCallData(proof, publicSignals),
  )
  const args: GetFunctionArgs<typeof abi, 'verifyProof'>['args'] =
    data !== undefined ? bigintify(JSON.parse(`[${data}]`)) : undefined

  useEffect(() => {
    execute()
  }, [execute])

  const {
    data: valid,
    error,
    isError,
    isLoading,
  } = useContractRead({
    abi,
    address: config.verifier.address,
    args,
    chainId: config.verifier.chainId,
    enabled: args !== undefined && !isLoadingSnarkJs,
    functionName: 'verifyProof',
  })

  return {
    error: errorSnarkJs ?? error,
    isError: errorSnarkJs !== undefined || isError,
    isLoading: isLoadingSnarkJs || isLoading,
    valid,
  }
}
