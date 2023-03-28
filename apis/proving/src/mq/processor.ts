import { Job } from "bullmq";
import {processProofRequest} from "../prove";

export async function jobProcessor(job: Job): Promise<'DONE'> {
    await job.log(`Processing job ${job.id}...`)
    console.log(`Job with id ${job.id}`, job.data)

    await processProofRequest(job.data)

    await job.updateProgress(100)
    return 'DONE'
}