import {
    MembershipProver, MerkleProof, defaultPubkeyMembershipPConfig
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
        const prover = new MembershipProver(defaultPubkeyMembershipPConfig);
        await prover.initWasm();

        const msgHash = Buffer.from(hashPersonalMessage(Buffer.from(this.message)));

        const proveInput = {
            sig: this.rawSignature, 
            msgHash, 
            merkleProof: this.merkleProof
        };

        const fullProof = await prover.prove(proveInput);

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
