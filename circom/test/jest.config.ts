import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	collectCoverage: false,
	displayName: 'circom',
	preset: '@anonklub/test',
}

export default jestConfig
