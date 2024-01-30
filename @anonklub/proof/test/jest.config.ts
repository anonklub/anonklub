import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  // the deployed app used the wasm merkle tree
  // no deployed stuff uses the js merkle tree classes and helpers, so we exclude them from coverage
  // still they are left in the package for info
  coveragePathIgnorePatterns: [
    'src/index.ts',
    'src/poseidon.ts',
    'src/ExcludableMerkleTree.ts',
    'src/MerkleTree.ts',
    'src/helpers.ts',
  ],
  displayName: '@anonklub/proof',
  preset: '@anonklub/test',
  rootDir: '..',
}

export default jestConfig
