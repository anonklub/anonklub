import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: [
    'circom/generated/**',
    'contracts/lib/openzeppelin-contracts/**',
    'discord-bot/src/lib/logger.ts',
    'query-api/src/repositories/graph-client/.graphclient/**',
    'ui/public/**',
  ],
}

export default config
