import type { JestConfigWithTsJest } from 'ts-jest'
import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**', '!src/lib/**', '!src/lib/graph/**'],
  coverageDirectory: '../../coverage',
  coveragePathIgnorePatterns: ['index.ts'],
  coverageThreshold: {
    global: {
      // branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  displayName: 'query-api',
  moduleDirectories: ['node_modules', __dirname],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-chain', './test/setup.ts'],
}

export default jestConfig
