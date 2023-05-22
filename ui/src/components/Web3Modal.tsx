'use client'
import { Web3Modal as _Web3Modal } from '@web3modal/react'
import config from '#/config'
import { ethereumClient } from '#/ethereum-client'

export function Web3Modal() {
  return (
    <_Web3Modal
      projectId={config.walletConnectProjectId}
      ethereumClient={ethereumClient}
    />
  )
}
