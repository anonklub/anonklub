import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  collectCoverage: true,
  collectCoverageFrom: [
    'apis/query/src/**',
    '!apis/query/src/lib/**',
  ],
  coverageDirectory: 'coverage',
  projects: ['jest.lint.ts', 'jest.prettier.ts', 'apis/query/jest.config.ts'],
  verbose: true,
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

export default jestConfig
