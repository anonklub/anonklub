import { queue } from '../mq/queue'

export const proofHandler = async (req, res) => {
  const proofRequest = req.body
  const job = await queue.add('prove', proofRequest)
  res.json(job)
}
