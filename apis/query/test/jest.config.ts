import type { JestConfigWithTsJest } from 'ts-jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from '../tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**', '!src/lib/**', '!src/lib/graph/**'],
  coverageDirectory: '../../coverage',
  coveragePathIgnorePatterns: ['index.ts'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 65,
      lines: 75,
      statements: 75,
    },
  },
  displayName: 'query-api',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  preset: 'ts-jest',
  rootDir: '..',
  setupFilesAfterEnv: ['jest-chain', './test/setup.ts'],
}

export default jestConfig
