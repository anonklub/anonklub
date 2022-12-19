import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  // FIXME: coverage not triggered when configured here?
  projects: [
    'jest.lint.ts',
    'jest.prettier.ts',
    'apis/query/jest.config.ts',
    'circuits/circom/jest.config.ts',
  ],
  verbose: true,
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

export default jestConfig
