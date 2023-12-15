import { useAsync, useStore } from '@hooks'
import { useCircuit } from './useCircuit';
import { Hex } from 'viem';

export const useProofWorker = () => {
    const { proofRequest } = useStore();
    const { prove, proving } = useCircuit();

    const {
        data: fullProof,
        error,
        execute,
        isLoading,
    } = useAsync(async () => {
        if (proofRequest === null) return

        const fullProof = await prove(proofRequest.rawSignature as Hex, proofRequest.message, [proofRequest.merkleProof]);

        return fullProof;
    }, 'submit-proof-request')

    return { error, execute, isLoading, fullProof }
}
