import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { _Command } from './_Command'
import { CommandName } from './interface'

export class ProveCommand extends _Command {
  public commandBuilder = new SlashCommandBuilder()
    .setName(CommandName.Prove)
    .setDescription('Generate a proof')

  async handleFn(interaction: CommandInteraction): Promise<void> {
    const { user } = interaction
    const { username } = user

    await interaction.reply(
      `Hello, ${username}, go to [anonklub.fly.dev](https://anonklub.fly.dev) to generate a proof!`,
    )
  }
}
