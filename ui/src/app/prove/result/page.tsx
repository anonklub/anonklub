'use client'
import Link from 'next/link'
import { config } from '#'
import { Loader } from '@components'
import { useProofResult, useSpartanECDSACircomRequest, useSpartanECDSARustRequest } from '@hooks'
import {  } from '@/hooks';

export default function Page() {
  //const { fullProof } = useSpartanECDSACircomRequest();
  const { fullProof } = useSpartanECDSARustRequest();
   return (
    <div className='justify center flex flex-col space-y-10'>
      <h2 className='self-start'>Proof Results</h2>
      {fullProof !== null ? fullProof : null}
    </div>
  )
}
