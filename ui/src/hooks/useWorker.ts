import { SpartanEcdsaWorker } from '@anonklub/spartan-ecdsa-worker'
import { useEffect, useState } from 'react'
import { MerkleTreeWorker } from '@anonklub/merkle-tree-worker'

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
