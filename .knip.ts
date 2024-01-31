import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: [
    'circom/generated/**',
    'contracts/lib/openzeppelin-contracts/**',
    'discord-bot/src/lib/logger.ts',
    'query-api/src/api/controllers/AnonymitySet.ts',
    'query-api/src/api/controllers/requests/**',
    'query-api/src/api/middlewares/**',
    'query-api/src/api/repositories/**',
    'query-api/src/lib/graph/.graphclient/**',
    'ui/public/**',
  ],
}

export default config
