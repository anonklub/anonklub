'use client'
import Link from 'next/link'
import { config } from '#'
import { Loader } from '@components'
import { useProofResult, useSpartanProofResult } from '@hooks'
import { useProofWorker } from '@/hooks/useProofWorker'

export default function Page() {
  //const { fullProof } = useProofWorker();

  const { fullProof } = useSpartanProofResult();
   return (
    <div className='justify center flex flex-col space-y-10'>
      <h2 className='self-start'>Proof Results</h2>
      {fullProof?.proof !== null ? fullProof?.proof : null}
    </div>
  )
}
