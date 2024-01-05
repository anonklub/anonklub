import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  coveragePathIgnorePatterns: ['!src/poseidon.ts'],
  displayName: '@anonklub/proof',
  preset: '@anonklub/test',
  rootDir: '..',
}

export default jestConfig
