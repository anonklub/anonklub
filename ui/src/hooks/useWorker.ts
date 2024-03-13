import { MerkleTreeWorker } from '@anonklub/merkle-tree-worker'
import { SpartanEcdsaWorker } from '@anonklub/spartan-ecdsa-worker'
import { useEffect, useState } from 'react'

export const useWorker = (
  worker: typeof SpartanEcdsaWorker | typeof MerkleTreeWorker,
) => {
  const [isWorkerReady, setIsWorkerReady] = useState(false)

  useEffect(() => {
    void (async () => {
      await worker.prepare()
      setIsWorkerReady(true)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isWorkerReady
}
