import { Queue } from 'bullmq'
import { connection, QUEUE_NAME } from './config'

export const queue = new Queue(QUEUE_NAME, { connection })
queue
  .obliterate({ force: !!process.env?.force })
  .then(() => console.log('Queue obliterated'))
  .catch((err) => console.error(err))
