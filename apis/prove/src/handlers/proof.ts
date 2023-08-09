import { createHash } from 'crypto'
import { ProofRequestJson } from '@anonklub/proof'
import { queue } from '../mq/queue'

// TODO: use a real secret salt
const generateId = (proofRequestJson: ProofRequestJson) =>
  createHash('sha256')
    .update('some salt')
    .update(JSON.stringify(proofRequestJson))
    .digest('hex')

// TODO: validate that the body matches ProofRequestJson
export const proofHandler = async (req, res) => {
  const proofRequestJson: ProofRequestJson = req.body
  const { id } = await queue.add('prove', proofRequestJson, {
    jobId: generateId(proofRequestJson),
  })

  res.json({
    jobId: id as string,
    message: `
    Proof Generation Job ${id as string} added to queue.
    It might take 5- 10 min to complete.
    Check your results later at
    /proofs/${id as string}/(input.json|proof.json|public.json|witness.wtns).
    `,
  })
}
