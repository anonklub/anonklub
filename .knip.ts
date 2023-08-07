import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: [
    'apis/prove/src/mq/processor.ts',
    'apis/query/src/api/controllers/AnonymitySet.ts',
    'apis/query/src/api/controllers/requests/**',
    'apis/query/src/api/middlewares/**',
    'apis/query/src/api/repositories/**',
    'apis/query/src/lib/graph/.graphclient/**',
    'circuits/circom/generated/**',
    'contracts/lib/openzeppelin-contracts/**',
    'discord-bot/src/lib/logger.ts',
    'ui/public/**',
  ],
}

export default config
