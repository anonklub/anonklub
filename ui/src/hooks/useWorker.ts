import type { MerkleTreeWorker } from '@anonklub/merkle-tree-worker'
import type { SpartanEcdsaWorker } from '@anonklub/spartan-ecdsa-worker'
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
  }, [])

  return isWorkerReady
}
