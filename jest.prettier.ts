import type { JestConfigWithTsJest } from 'ts-jest'

import common from './jest.common'

const jestPrettierConfig: JestConfigWithTsJest = {
  ...common,
  displayName: 'prettier',
  moduleFileExtensions: [
    'js',
    'mjs',
    'jsx',
    'ts',
    'tsx',
    'css',
    'less',
    'scss',
    'html',
    'json',
    'graphql',
    'md',
    'markdown',
    'mdx',
    'yaml',
    'yml',
  ],
  runner: 'jest-runner-prettier',
  testMatch: [
    '<rootDir>/**/*.(cjs|mjs|js|jsx|ts|tsx|css|scss|less|html|md|markdown|json|yaml|yml)',
  ],
}

export default jestPrettierConfig
