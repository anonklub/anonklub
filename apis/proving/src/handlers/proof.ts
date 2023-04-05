import { createHash } from 'crypto'
import { queue } from '../mq/queue'

const sha256 = createHash('sha256')
sha256.update('some salt') // TODO: use a real secret salt

const generateId = (proofRequestBody: any) => {
  sha256.update(JSON.stringify(proofRequestBody))
  return sha256.digest('hex')
}

export const proofHandler = async (req, res) => {
  const proofRequest = req.body
  const job = await queue.add('prove', proofRequest, {
    jobId: generateId(proofRequest),
  })
  res.json(job)
}
