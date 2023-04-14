import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/ProofRequest/*.ts', 'src/CircuitInput/*.ts'],
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  displayName: 'membership',
  preset: 'ts-jest',
  rootDir: '..',
  setupFiles: ['./test/setupTest.ts'],
}

export default jestConfig
