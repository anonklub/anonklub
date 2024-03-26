'use client'
import { Screen } from '@components'
import { useResetAnonSet, useSetHelp } from '@hooks'

export default function ChooseAnonSetAssetPage() {
	useSetHelp([
		'ERC20: are you a member of the group of people who own a min amount of a given ERC20 token?',
		'ETH: are you a member of the group of people who own a min amount of ETH?',
		'NFT: are you a member of the group of people who own an NFT of a given collection?',
	])
	useResetAnonSet()

	return (
		<Screen
			question='What type of asset do you want to prove you own?'
			buttons={[
				{ href: '/query/asset/erc20', text: 'ERC20' },
				{ href: '/query/asset/eth', text: 'ETH' },
				{ href: '/prove/prepare/from-on-chain/asset/nft', text: 'NFT' },
			]}
		/>
	)
}
