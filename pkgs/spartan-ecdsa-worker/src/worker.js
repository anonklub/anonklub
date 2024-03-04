import { expose } from 'comlink';
import { hashMessage, hexToBytes, hexToSignature } from 'viem';
import { calculateSigRecovery } from './utils';
let spartanEcdsaWasm;
let initialized = false;
export const spartanEcdsaWorker = {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async prepare() {
        spartanEcdsaWasm = await import('@anonklub/spartan-ecdsa-wasm');
        spartanEcdsaWasm.init_panic_hook();
        if (!initialized) {
            spartanEcdsaWasm.prepare();
            initialized = true;
        }
    },
    proveMembership({ merkleProofBytesSerialized, message, sig }) {
        const { r, s, v } = hexToSignature(sig);
        const sBytes = hexToBytes(s, {
            size: 32,
        });
        const rBytes = hexToBytes(r, {
            size: 32,
        });
        const isYOdd = calculateSigRecovery(v);
        const msgHash = hashMessage(message, 'bytes');
        return spartanEcdsaWasm.prove_membership(sBytes, rBytes, isYOdd, msgHash, merkleProofBytesSerialized);
    },
    verifyMembership(anonklubProof) {
        return spartanEcdsaWasm.verify_membership(anonklubProof);
    },
};
expose(spartanEcdsaWorker);
