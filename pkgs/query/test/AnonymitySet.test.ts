import { createEthAddresses } from '@anonklub/test'
import { faker } from '@faker-js/faker'
import { AnonymitySet, Choice, Endpoint, Environment, URLS } from '../src'

describe('AnonymitySet', () => {
	let anonymitySet: AnonymitySet
	let randNum: number
	let min: string
	let env: Environment

	beforeEach(() => {
		env = [Environment.PRODUCTION, Environment.STAGING][
			faker.datatype.number({ max: 1, min: 0 })
		]
		randNum = faker.datatype.number({ max: 10, min: 1 })
		min = faker.random.numeric(randNum)
		anonymitySet = new AnonymitySet(env)
		fetchMock.once(
			JSON.stringify({
				data: createEthAddresses(randNum),
			}),
		)
	})

	it('returns a list of ethereum addresses from an eth balance anonymity set', async () => {
		const { data } = await anonymitySet.fromEthBalance({ min })

		expect(data).toBeDefined()
		data?.forEach((address) => {
			expect(address).toMatch(/^0x[0-9a-fA-F]{40}$/)
		})
		expect(fetchMock).toHaveBeenCalledWith(
			`${URLS[env]}/${Endpoint.EthBalance}?min=${min}`,
		)
	})

	it('returns a list of ethereum addresses from an erc20 balance anonymity set', async () => {
		const tokenAddress = createEthAddresses(1)[0]
		const { data } = await anonymitySet.fromErc20Balance({ min, tokenAddress })

		expect(data).toBeDefined()
		data?.forEach((address) => {
			expect(address).toMatch(/^0x[0-9a-fA-F]{40}$/)
		})
		expect(fetchMock).toHaveBeenCalledWith(
			`${URLS[env]}/${Endpoint.Erc20Balance}?min=${min}&tokenAddress=${tokenAddress}`,
		)
	})

	it('returns a list of ethereum addresses from a cryptopunk owners anonymity set', async () => {
		const { data } = await anonymitySet.fromCryptoPunkOwners()

		expect(data).toBeDefined()
		data?.forEach((address) => {
			expect(address).toMatch(/^0x[0-9a-fA-F]{40}$/)
		})
		expect(fetchMock).toHaveBeenCalledWith(
			`${URLS[env]}/${Endpoint.CryptoPunks}`,
		)
	})

	it('returns a list of ethereum addresses from a beacon contract depositors anonymity set', async () => {
		const { data } = await anonymitySet.fromBeaconDepositors()

		expect(data).toBeDefined()
		data?.forEach((address) => {
			expect(address).toMatch(/^0x[0-9a-fA-F]{40}$/)
		})
		expect(fetchMock).toHaveBeenCalledWith(
			`${URLS[env]}/${Endpoint.BeaconDepositors}`,
		)
	})

	it('returns a list of ethereum addresses from a ENS Proposal Voters anonymity set', async () => {
		const id = faker.datatype.hexadecimal({ length: 40 })
		// pick a random values from the possible Choice enum values, don't use faker

		const choice = [Choice.Abstain, Choice.For, Choice.Against][
			faker.datatype.number({ max: 2, min: 0 })
		]

		const { data } = await anonymitySet.fromEnsProposalVoters({
			choice,
			id,
		})

		expect(data).toBeDefined()
		data?.forEach((address) => {
			expect(address).toMatch(/^0x[0-9a-fA-F]{40}$/)
		})
		expect(fetchMock).toHaveBeenCalledWith(
			`${URLS[env]}/${Endpoint.EnsProposalVoters}?choice=${
				choice as string
			}&id=${id}`,
		)
	})
})
