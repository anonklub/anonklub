import { Events, Interaction } from 'discord.js'
import { CommandName } from 'commands'
import { _Event } from './_Event'
import { HandledEvent } from './interface'

export class InteractionCreate extends _Event {
  public name = Events.InteractionCreate as HandledEvent
  override bind = true

  async handleFn(interaction: Interaction) {
    if (!interaction.isCommand()) return

    const command = this.client.commands.get(
      interaction.commandName as CommandName,
    )

    if (command !== undefined) await command.handle(interaction)
  }
}
