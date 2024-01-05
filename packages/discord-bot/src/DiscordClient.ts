import { Client } from 'discord.js'
import { Service } from 'typedi'
import { config } from '~'

@Service()
export class DiscordClient extends Client {
  constructor() {
    super({ intents: config.intents })
  }
}
