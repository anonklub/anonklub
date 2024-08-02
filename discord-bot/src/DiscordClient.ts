import { config } from '#/config'
import { Client } from 'discord.js'
import { Service } from 'typedi'

@Service()
export class DiscordClient extends Client {
  constructor() {
    super({ intents: config.intents })
  }
}
