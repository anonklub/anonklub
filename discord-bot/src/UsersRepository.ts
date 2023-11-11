import { Client } from 'discord.js'
import { createClient } from 'redis'
import { Repository, Schema } from 'redis-om'
import { Service } from 'typedi'
import { config } from '~'

@Service()
export class UsersRepository extends Repository {
  constructor() {
    const redis = createClient({
      url: config.DISCORD_REDIS_URL,
    })
    redis.on('error', (err) => {
      console.error('Redis error:', err)
    })
    const schema = new Schema('user', {
      id: { type: 'string' },
      messagesInVerifChannel: { type: 'string[]' },
      privateChannelId: { type: 'string' },
    })

    super(schema, redis)
  }
}
