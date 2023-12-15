import { WitnessInput } from "./interface";

export class Circuit {
    circuit: any;
    private initialized: boolean;

    constructor() {
        this.initialized = false;
    }

    async prepare() {
        this.circuit = await import("@anonklub/spartan-circuit");
        this.circuit.init_panic_hook();

        if (!this.initialized) {
            this.initialized = true;
        }
    }

    async prove({
        s,
        r,
        isYOdd,
        msgHash,
        siblings,
        indices,
        roots
    }: WitnessInput): Promise<Uint8Array> {
        const proof = await this.circuit.prove_membership(
            s,
            r,
            isYOdd,
            msgHash,
            siblings,
            indices,
            roots
        );

        return proof;
    }
}