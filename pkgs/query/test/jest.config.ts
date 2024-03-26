import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	displayName: '@anonklub/query',
	preset: '@anonklub/test',
	rootDir: '..',
}

export default jestConfig
