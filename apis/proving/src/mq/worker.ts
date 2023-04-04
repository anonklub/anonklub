import { Job, Worker } from 'bullmq'
import { connection, QUEUE_NAME } from './config'

const worker = new Worker(
  QUEUE_NAME,
  async (job: Job) => {
    console.log(job.data)
  },
  { connection },
)

worker.on('active', (job) => {
  console.debug(`Job ${job.id} is active`)
})

worker.on('completed', (job) => {
  console.debug(`Job ${job.id} completed!`)
})

worker.on('failed', (job, err) => {
  // @ts-expect-error
  console.error(`Job ${job.id} failed with error ${err.message}`)
})

process.on('SIGINT', () => {
  worker
    .close()
    .then(() => {
      console.log('Worker closed')
      process.exit(0)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
})
