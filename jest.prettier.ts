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
  testPathIgnorePatterns: [
    '<rootDir>/.idea/',
    'pnpm-lock.yaml',
    '<rootDir>/apis/query/dist',
    '<rootDir>/apis/query/src/lib/graph/.graphclient',
    '<rootDir>/docs/.docusaurus',
    '<rootDir>/coverage',
    '/node_modules/',
    '/dist/',
    '/build',
  ],
}

export default jestPrettierConfig
