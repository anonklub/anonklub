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
  const { id } = await queue.add('prove', proofRequest, {
    jobId: generateId(proofRequest),
  })
  res.send(
    `
    Proof Generation Job ${id as string} added to queue.
    It might take 5- 10 min to complete.
    Check your results later at
    /proofs/${id as string}/(input.json|proof.json|public.json|witness.wtns).
    `,
  )
}
