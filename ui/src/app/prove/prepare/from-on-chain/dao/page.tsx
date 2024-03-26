'use client'
import { Screen } from '@components'
import { useResetAnonSet, useSetHelp } from '@hooks'

export default function ChooseAnonSetDaoPage() {
	useSetHelp([
		'ENS: are you a member of the group of people who voted on a specific ENS proposal.',
	])
	useResetAnonSet()

	return (
		<Screen
			question='Which DAO do you want to prove you participated in the governance of?'
			buttons={[{ href: '/query/dao/ens', text: 'ENS' }]}
		/>
	)
}
