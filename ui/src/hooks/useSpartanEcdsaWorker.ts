import { useEffect } from "react";
import { SpartanEcdsaWorker, ProveMembershipFn, VerifyMembershipFn } from "@anonklub/spartan-ecdsa-worker";

export const useSpartanEcdsaWorker = () => {
    useEffect(() => {
        (async () => {
            await SpartanEcdsaWorker.prepare();
        })();
    }, []);

    const proveMembership: ProveMembershipFn = async ({
        sig,
        message,
        merkleProofBytesSerialized
    }): Promise<Uint8Array> => {
        console.time('==> Prove');
        const proof = await SpartanEcdsaWorker.proveMembership({
            sig,
            message,
            merkleProofBytesSerialized
        });
        console.timeEnd('==> Prove');

        return proof;
    };

    const verifyMembership: VerifyMembershipFn = async (anonklubProof: Uint8Array): Promise<boolean> => {
        console.time('==> Verify');
        const isVerified = await SpartanEcdsaWorker.verifyMembership(anonklubProof);
        console.timeEnd('==> Verify');

        return isVerified
    }

    return {
        proveMembership,
        verifyMembership
    }
}