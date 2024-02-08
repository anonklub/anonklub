import {
  ProveMembershipFn,
  SpartanEcdsaWorker,
  VerifyMembershipFn,
} from '@anonklub/spartan-ecdsa-worker'
import { useEffect } from 'react'

export const useSpartanEcdsaWorker = () => {
  useEffect(() => {
    void (async () => {
      await SpartanEcdsaWorker.prepare()
    })()
  }, [])

  const proveMembership: ProveMembershipFn = async ({
    merkleProofBytesSerialized,
    message,
    sig,
  }): Promise<Uint8Array> => {
    console.time('==> Prove')
    const proof = await SpartanEcdsaWorker.proveMembership({
      merkleProofBytesSerialized,
      message,
      sig,
    })
    console.timeEnd('==> Prove')

    return proof
  }

  const verifyMembership: VerifyMembershipFn = async (
    anonklubProof: Uint8Array,
  ): Promise<boolean> => {
    console.time('==> Verify')
    const isVerified = await SpartanEcdsaWorker.verifyMembership(anonklubProof)
    console.timeEnd('==> Verify')

    return isVerified
  }

  return {
    proveMembership,
    verifyMembership,
  }
}
