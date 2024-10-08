'use client'
import { config, NAVIGATION } from '#'
import { ProofBinFileInput } from '@components'
import { useSetHelp, useStore } from '@hooks'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Page() {
  useSetHelp([
    `You need to provide a previously generated \`${config.proofAttachmentName}\` file.`,
  ])
  const { proof, setProof } = useStore()
  const canVerify = proof !== null

  useEffect(() => {
    setProof(null)
  }, [setProof])

  return (
    <div className='flex flex-col space-y-10'>
      <div className='self-end'>
        {canVerify && (
          <Link href='/verify/result'>
            <button className='btn btn-secondary self-center' type='button'>
              {NAVIGATION.VERIFY_PROOF}
            </button>
          </Link>
        )}
      </div>

      <div className='flex flex-row pt-20'>
        <ProofBinFileInput title='Proof' />
      </div>
    </div>
  )
}
