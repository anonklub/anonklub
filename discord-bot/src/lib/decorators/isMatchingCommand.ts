import type { CommandInteraction } from 'discord.js'
import type { _Command } from 'commands/_Command'

export function isMatchingCommand(
	_target: any,
	_propertyKey: string | symbol,
	descriptor: PropertyDescriptor,
) {
	const originalMethod = descriptor.value

	descriptor.value = async function (
		interaction: CommandInteraction,
	): Promise<void> {
		if (interaction.commandName !== (this as _Command).commandBuilder.name)
			return

		await originalMethod.call(this, interaction)
	}

	return descriptor
}
