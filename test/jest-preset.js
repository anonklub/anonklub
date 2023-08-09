const tsJestPreset = require('ts-jest/jest-preset')
const { resolve } = require('path')

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
module.exports = {
  ...tsJestPreset,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/*.d.ts'],
  coverageDirectory: resolve('../coverage'),
  coverageThreshold: {
    global: {
      branches: 87,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleDirectories: [
    'node_modules',
    '<rootDir>/node_modules',
    '<rootDir>/*/src',
    '<rootDir>/src',
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
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
