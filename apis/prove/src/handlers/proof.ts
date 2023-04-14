import { createHash } from 'crypto'
import { ProofRequestJson } from '@anonset/membership'
import { queue } from '../mq/queue'

const sha256 = createHash('sha256')
sha256.update('some salt') // TODO: use a real secret salt

const generateId = (proofRequestJson: ProofRequestJson) => {
  sha256.update(JSON.stringify(proofRequestJson))
  return sha256.digest('hex')
}

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
