import type { JestConfigWithTsJest } from 'ts-jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from '../tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  coveragePathIgnorePatterns: ['.graphclient', 'lib'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 65,
      lines: 75,
      statements: 75,
    },
  },
  displayName: 'query-api',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  preset: '@anonklub/test',
  rootDir: '..',
}

export default jestConfig
