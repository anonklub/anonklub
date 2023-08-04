import {
  ChannelType,
  CommandInteraction,
  PermissionsBitField,
  SlashCommandBuilder,
} from 'discord.js'
import { config } from '~'
import { _Command } from './_Command'
import { CommandName } from './interface'

export class VerifyCommand extends _Command {
  public commandBuilder = new SlashCommandBuilder()
    .setName(CommandName.Verify)
    .setDescription('Verify yourself')

  async handleFn(interaction: CommandInteraction): Promise<void> {
    const { username } = interaction.user
    const privateChannel = await this._createPrivateChannel(interaction)

    await privateChannel.send({
      content: `Hello \`${username}\`, please upload your proof.json and public.json files here. Visit https://anonklub.fly.dev to generate a proof and download the corresponding files beforehand.`,
    })
    await interaction.reply({
      content: `Hello \`${username}\`, please check #private-verify-${username} for further instructions.`,
    })
  }

  private async _createPrivateChannel(interaction: CommandInteraction) {
    const privateChannel = await interaction.guild?.channels.create({
      name: `private-verify-${interaction.user.username}`,
      permissionOverwrites: [
        {
          allow: [
            PermissionsBitField.Flags.AttachFiles,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.ReadMessageHistory,
          ],
          id: interaction.user.id,
        },
        {
          id: config.CLIENT_ID,
        },
      ],
      type: ChannelType.GuildText,
    })

    if (privateChannel === undefined)
      throw new Error('Failed creating private channel')

    return privateChannel
  }
}
