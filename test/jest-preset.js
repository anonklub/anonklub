const tsJestPreset = require('ts-jest/jest-preset')
const { join } = require('path')

const projects = [
  ...['proof', 'query'].map((name) => `@anonklub/${name}`),
  'apis/query',
].map((name) => join(__dirname, '..', name, 'test'))

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
module.exports = {
  ...tsJestPreset,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/*.d.ts'],
  coverageDirectory: join(__dirname, '..', 'coverage'),
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
  moduleDirectories: [
    'node_modules',
    '<rootDir>/node_modules',
    '<rootDir>/*/src',
    '<rootDir>/src',
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  projects,
  rootDir: '..',
  setupFilesAfterEnv: [require.resolve('../test/setup.ts')],
  testPathIgnorePatterns: [
    '.graphclient',
    'coverage',
    'dist',
    'node_modules',
    'openzeppelin-contracts',
    'pnpm-lock.yaml',
  ],
  verbose: true,
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
