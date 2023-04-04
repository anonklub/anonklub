import { Queue } from 'bullmq'
import { connection, QUEUE_NAME } from './config'

export const queue = new Queue(QUEUE_NAME, { connection })
