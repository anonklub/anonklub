import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { createBullBoard } from '@bull-board/api'
import { ExpressAdapter } from '@bull-board/express'
import { queue } from './mq/queue'

const serverAdapter = new ExpressAdapter()

createBullBoard({
  queues: [new BullMQAdapter(queue)],
  serverAdapter,
})
serverAdapter.setBasePath('/dashboard')

export { serverAdapter as dashboard }
