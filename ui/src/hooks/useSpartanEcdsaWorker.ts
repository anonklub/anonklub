import {
	ProveMembershipFn,
	SpartanEcdsaWorker,
	VerifyMembershipFn,
} from '@anonklub/spartan-ecdsa-worker'
import { useWorker } from '@/hooks'

export const useSpartanEcdsaWorker = () => {
	const isWorkerReady = useWorker(SpartanEcdsaWorker)

	const proveMembership: ProveMembershipFn = async ({
		merkleProofBytesSerialized,
		message,
		sig,
	}): Promise<Uint8Array> => {
		process.env.NODE_ENV === 'development' && console.time('==> Prove')

		const proof = await SpartanEcdsaWorker.proveMembership({
			merkleProofBytesSerialized,
			message,
			sig,
		})

		process.env.NODE_ENV === 'development' && console.timeEnd('==> Prove')

		return proof
	}

	const verifyMembership: VerifyMembershipFn = async (
		anonklubProof: Uint8Array,
	): Promise<boolean> => {
		process.env.NODE_ENV === 'development' && console.time('==> Verify')

		const isVerified = await SpartanEcdsaWorker.verifyMembership(anonklubProof)

		process.env.NODE_ENV === 'development' && console.timeEnd('==> Verify')

		return isVerified
	}

	return {
		isWorkerReady,
		proveMembership,
		verifyMembership,
	}
}
