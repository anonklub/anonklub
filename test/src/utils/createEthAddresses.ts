import { faker } from '@faker-js/faker'

export const createEthAddresses = (count: number): string[] =>
	[...Array(count).values()].map(() => faker.finance.ethereumAddress())
