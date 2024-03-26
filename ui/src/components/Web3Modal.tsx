'use client'
import { Web3Modal as _Web3Modal } from '@web3modal/react'
import { config, ethereumClient } from '#'

export function Web3Modal() {
	return (
		<_Web3Modal
			projectId={config.walletConnectProjectId}
			ethereumClient={ethereumClient}
		/>
	)
}
