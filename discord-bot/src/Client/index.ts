import { Service } from 'typedi'
import { config, error, info } from '~'
import { commands } from 'commands'
import { DiscordClient } from 'DiscordClient'
import { Events } from '../events'
import { ClientI } from './interface'
import { TextChannel } from 'discord.js'
import { UsersRepository } from '../UsersRepository'

@Service()
export class Client implements ClientI {
  public events = Events
  public commands = commands
  public verificationChannel!: TextChannel

  constructor(public discord: DiscordClient, public users: UsersRepository) {}

  async init() {
    info('Setting up event handlers...')
    this.events.forEach((Event) => {
      const event = new Event(this)
      event.init()
    })

    this.verificationChannel = (await this.discord.channels.fetch(
      config.VERIFICATION_CHANNEL_ID,
    )) as TextChannel

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
