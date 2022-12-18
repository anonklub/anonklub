import type { JestConfigWithTsJest } from 'ts-jest'

const jestCommonConfig: JestConfigWithTsJest = {
  testPathIgnorePatterns: [
    'node_modules',
    'coverage',
    '.graphclient',
    'dist',
    'pnpm-lock.yaml',
  ],
}

export default jestCommonConfig
