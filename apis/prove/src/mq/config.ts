const REDIS_QUEUE_HOST = process.env['REDIS_QUEUE_HOST'] ?? 'localhost'
const REDIS_QUEUE_PORT =
  process.env['REDIS_QUEUE_PORT']?.match(/^[0-9]+$/) != null
    ? parseInt(process.env['REDIS_QUEUE_PORT'])
    : 6379

export const connection = { host: REDIS_QUEUE_HOST, port: REDIS_QUEUE_PORT }
export const QUEUE_NAME = 'proof-requests-queue'
