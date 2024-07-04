import { commands } from 'commands'
import { Events } from 'discord.js'
import { config, error, info } from '~'
import { _Event } from './_Event'
import { HandledEvent, ListeningMethod } from './interface'

export class ClientReady extends _Event {
  override bind = true
  override listeningMethod = ListeningMethod.Once
  name = Events.ClientReady as HandledEvent

  handleFn(): void {
    // execute specific actions once the bot is fully ready and connected to Discord here
    // This might include fetching additional data from Discord, initializing custom modules, or setting the bot's status/activity.

    info('Registering slash commands')
    this.client.discord.guilds.cache
      .get(config.GUILD_ID)
      ?.commands.set(
        Array.from(commands.values()).map((command) => command.commandBuilder),
      )
      .then(() => {
        info('Slash commands registered')
      })
      .catch((err) => {
        error('Failed to register slash commands')
        console.error(err)
      })

    info(
      this.client.discord.user !== null
        ? `Client ${this.client.discord.user.username} ${this.client.discord.user.tag} fully ready and connected to discord`
        : 'Ready!',
    )
  }
}
