import {
    MembershipProver, MembershipVerifier, MerkleProof, defaultAddressMembershipPConfig, defaultAddressMembershipVConfig, defaultPubkeyMembershipPConfig
} from "@anonklub/spartan-ecdsa";
import { hashPersonalMessage } from "@ethereumjs/util";

import {
    JobResponse,
    ProofRequestArgs,
    ProofRequestInterface,
    ProofRequestJson,
    ProofRequestType,
    ProofResult,
} from './interface'

export class ProofRequest implements ProofRequestInterface {
    public readonly addresses: string[]
    public readonly merkleProof: MerkleProof;
    public readonly message: string
    public readonly rawSignature: string
    public jobId: string | undefined
    public readonly url: string

    constructor({ addresses, merkleProof, message, rawSignature, url }: ProofRequestArgs) {
        // TODO: validate params
        this.addresses = addresses
        this.message = message
        this.merkleProof = merkleProof;
        this.rawSignature = rawSignature
        this.url = url
    }

    private toJSON(): ProofRequestJson {
        const { jobId, url, ...rest } = this
        return rest
    }

    private serialize() {
        return JSON.stringify(this.toJSON())
    }

    async submit() {
        const jobResponse = (await fetch(`${this.url}/proof`, {
            body: this.serialize(),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        }).then(async (res) => res.json())) as JobResponse

        this.jobId = jobResponse.jobId

        return jobResponse
    }

    async submitSpartanECDSA() {
        const prover = new MembershipProver(defaultAddressMembershipPConfig);
        await prover.initWasm();

        console.log("==> Spartan ECDSA Prover is initialized");

        const msgHash = Buffer.from(hashPersonalMessage(Buffer.from(this.message)));

        const proveInput = {
            sig: this.rawSignature,
            msgHash,
            merkleProof: this.merkleProof
        };

        console.log("==> The prove inputs");
        console.log(proveInput);

        const startProverTime = Date.now();

        console.log("==> Start generating the proof");
        const fullProof = await prover.prove(proveInput);

        const endProverTime = Date.now();
        const proverDuration = (endProverTime - startProverTime) / 1000;

        console.log("==> Generating the proof is done successfully");
        console.log("==> - The generated proof:", fullProof.proof);
        console.log("==> - The proof public input:", fullProof.publicInput);
        console.log(`==> - Time taken to generate the proof: ${proverDuration} seconds`);

        const verifier = new MembershipVerifier(defaultAddressMembershipVConfig);
        await verifier.initWasm();

        console.log("==> Spartan ECDSA Verifier is initialized");

        const startVerifierTime = Date.now();

        console.log("==> Start verifying the proof");
        const isVerified = await verifier.verify({ proof: fullProof.proof, publicInputSer: fullProof.publicInput.serialize() });

        const endVerifierTime = Date.now();
        const verifierDuration = (endVerifierTime - startVerifierTime) / 1000;

        console.log("==> Verifying the proof is done successfully");
        console.log("==> - The proof verification is:", isVerified);
        console.log(`==> - Time taken to verify the proof: ${verifierDuration} seconds`);

        return fullProof
    }

    async submitType(type: ProofRequestType) {
        if (type === ProofRequestType.Server) {
            const jobResponse = (await fetch(`${this.url}/proof`, {
                body: this.serialize(),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            }).then(async (res) => res.json())) as JobResponse

            this.jobId = jobResponse.jobId

            return jobResponse
        } else if (type === ProofRequestType.ClientCircuit) {
            const prover = new MembershipProver(defaultPubkeyMembershipPConfig);
            await prover.initWasm();

            const msgHash = Buffer.from(hashPersonalMessage(Buffer.from(this.message)));

            const fullProof = await prover.prove({
                sig: this.rawSignature,
                msgHash,
                merkleProof: this.merkleProof
            });

            return fullProof
        } else if (type === ProofRequestType.ClientWasmWorker) {
            throw new Error("Please select the right proof type");
        } else {
            throw new Error("Please select the right proof type");
        }
    }

    async getResult(): Promise<ProofResult> {
        if (this.jobId === undefined) throw new Error('Job not submitted yet')

        const [proof, publicSignals] = await Promise.all(
            ['proof', 'public'].map(async (key) =>
                fetch(`${this.url}/${this.jobId}/${key}.json`).then(async (res) =>
                    res.json(),
                ),
            ),
        )
        return { proof, publicSignals }
    }
}
