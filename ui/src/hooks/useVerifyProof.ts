import { useEffect } from 'react'
import { GetFunctionArgs } from 'viem'
import { useContractRead } from 'wagmi'
import { abi, config } from '#'
import { useAsync } from '@/hooks/useAsync'
import { useStore } from '@/hooks/useStore'

const { groth16 } = require('snarkjs')

export const useVerifyProof = () => {
  const { proof, publicSignals } = useStore()

  const {
    data,
    error: errorSnarkJs,
    execute,
    isLoading: isLoadingSnarkJs,
  } = useAsync<string>(
    () => groth16.exportSolidityCallData(proof, publicSignals),
    'verify-proof-calldata',
  )
  const args: GetFunctionArgs<typeof abi, 'verifyProof'>['args'] =
    data !== undefined
      ? JSON.parse(`[${data}]`).map((argArr) =>
          argArr.map((arg) => BigInt(arg)),
        )
      : undefined

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
