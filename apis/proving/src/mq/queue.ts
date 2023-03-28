import {Job, Queue} from "bullmq"
import {ProofRequest} from "../interface";
import {QUEUE_NAME} from "./config";


const queue = new Queue(QUEUE_NAME)

export async function addProofRequestToQueue(proofRequest: ProofRequest): Promise<Job<ProofRequest>> {
    return queue.add("proof-request", proofRequest)
}