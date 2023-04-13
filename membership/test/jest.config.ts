import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  clearMocks: true,
  displayName: 'membership',
  preset: 'ts-jest',
  setupFiles: ['./setupTest.ts'],
}

export default jestConfig
