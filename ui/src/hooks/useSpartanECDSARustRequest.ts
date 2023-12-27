import { useAsync, useStore } from '@hooks'
import { useSpartanECDSARust } from './useSpartanECDSARust';
import { Hex } from 'viem';

export const useSpartanECDSARustRequest = () => {
    const { proofRequest } = useStore();
    const { prove } = useSpartanECDSARust();

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
