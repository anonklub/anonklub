'use client'
import { config, ethereumClient } from '#'
import { Web3Modal as _Web3Modal } from '@web3modal/react'

export function Web3Modal() {
  return (
    <_Web3Modal
      projectId={config.walletConnectProjectId}
      ethereumClient={ethereumClient}
    />
  )
}
