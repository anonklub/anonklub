import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  // FIXME: coverage not triggered when configured here?
  projects: [
    'apis/query/test/jest.config.ts',
    'circuits/circom/test/jest.config.ts',
    'membership/test/jest.config.ts',
  ],
  verbose: true,
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

export default jestConfig
