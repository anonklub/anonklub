import { Service } from 'typedi'
import { config, error, info, redis, usersRepository } from '~'
import { commands } from 'commands'
import { DiscordClient } from 'DiscordClient'
import { Events } from '../events'
import { ClientI } from './interface'

@Service()
export class Client implements ClientI {
  public events = Events
  public commands = commands

  constructor(
    public discord: DiscordClient,
    private readonly users: typeof usersRepository,
  ) {}

  async init() {
    info('Setting up event handlers...')
    this.events.forEach((Event) => {
      const event = new Event(this)
      event.init()
    })

    info('Logging in...')
    try {
      await this.login()
      info('Logged in!')
    } catch (err) {
      error('Error logging in:', err)
    }
    return this
  }

  async login() {
    await this.discord.login(config.BOT_TOKEN)
    await redis.connect()
  }

  stop() {
    this.discord.removeAllListeners()
  }
}
