import { useEffect } from 'react'
import {
  ProveMembershipFn,
  SpartanEcdsaWorker,
  VerifyMembershipFn,
} from '@anonklub/spartan-ecdsa-worker'

export const useSpartanEcdsaWorker = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        await SpartanEcdsaWorker.prepare()
      } catch (error) {
        throw new Error(error)
      }
    })()
  }, [])

  const proveMembership: ProveMembershipFn = async ({
    merkleProofBytesSerialized,
    message,
    sig,
  }): Promise<Uint8Array> => {
    try {
      console.time('==> Prove')
      const proof = await SpartanEcdsaWorker.proveMembership({
        merkleProofBytesSerialized,
        message,
        sig,
      })
      console.timeEnd('==> Prove')

      return proof
    } catch (error) {
      throw new Error(error)
    }
  }

  const verifyMembership: VerifyMembershipFn = async (
    anonklubProof: Uint8Array,
  ): Promise<boolean> => {
    try {
      console.time('==> Verify')
      const isVerified = await SpartanEcdsaWorker.verifyMembership(
        anonklubProof,
      )
      console.timeEnd('==> Verify')

      return isVerified
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    proveMembership,
    verifyMembership,
  }
}
