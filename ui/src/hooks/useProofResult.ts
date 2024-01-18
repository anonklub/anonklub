import { useAsync, useStore } from '@hooks'
import { useSpartanEcdsaWorker } from './useSpartanEcdsaWorker';
import { Hex } from 'viem';

export const useProofResult = () => {
    const { proofRequest } = useStore();
    const { proveMembership } = useSpartanEcdsaWorker();

    const {
        data: fullProof,
        error,
    } = useAsync(async () => {
        if (proofRequest === null) return

        const fullProof = await proveMembership({
          sig: proofRequest.rawSignature as Hex, 
          message: proofRequest.message, 
          merkleProofBytesSerialized: proofRequest.merkleProof
        });

        return fullProof;
    }, 'submit-proof-request')

    return { error, fullProof }
}
