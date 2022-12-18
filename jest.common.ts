import type { JestConfigWithTsJest } from 'ts-jest'

const jestLintConfig: JestConfigWithTsJest = {
  testPathIgnorePatterns: [
    'node_modules',
    'coverage',
    '.graphclient',
    'dist',
    'pnpm-lock.yaml',
  ],
}

export default jestLintConfig
