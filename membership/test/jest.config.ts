import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/poseidon.ts', '!**/*.d.ts'],
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      branches: 38,
      functions: 55,
      lines: 75,
      statements: 75,
    },
  },
  displayName: 'membership',
  preset: 'ts-jest',
  rootDir: '..',
  setupFiles: ['./test/setupTest.ts'],
}

export default jestConfig
