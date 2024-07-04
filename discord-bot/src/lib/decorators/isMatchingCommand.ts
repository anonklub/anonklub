import { _Command } from 'commands/_Command'
import { CommandInteraction } from 'discord.js'

export function isMatchingCommand(
  _target: any,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value

  descriptor.value = async function(
    interaction: CommandInteraction,
  ): Promise<void> {
    if (interaction.commandName !== (this as _Command).commandBuilder.name)
      return

    await originalMethod.call(this, interaction)
  }

  return descriptor
}
