import type { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export enum CommandName {
	Prove = 'prove',
	Verify = 'verify',
}

export interface _CommandI {
	commandBuilder: Omit<
		SlashCommandBuilder,
		'addSubcommand' | 'addSubcommandGroup'
	>
	handle: (interaction: CommandInteraction) => Promise<void>
}
