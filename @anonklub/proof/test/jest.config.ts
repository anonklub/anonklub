import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  coveragePathIgnorePatterns: ['!src/poseidon.ts'],
  coverageThreshold: {
    global: {
      branches: 37,
      functions: 55,
      lines: 75,
      statements: 75,
    },
  },
  displayName: '@anonklub/proof',
  preset: '@anonklub/test',
  rootDir: '..',
}

export default jestConfig
