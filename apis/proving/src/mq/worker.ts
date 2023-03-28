import { Worker } from 'bullmq'
import { join } from 'path'
import { QUEUE_NAME, REDIS_QUEUE_HOST, REDIS_QUEUE_PORT } from './config'

let worker: Worker
const processorPath = join(__dirname, 'processor.ts')

export function setupWorker() {
   worker = new Worker(QUEUE_NAME, processorPath, {
    connection: {
      host: REDIS_QUEUE_HOST,
      port: REDIS_QUEUE_PORT,
    },
     autorun: true,
  })

}
