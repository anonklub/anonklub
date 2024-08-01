import { config } from '#/config'
import { ChannelType, CommandInteraction, PermissionsBitField, SlashCommandBuilder } from 'discord.js'
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
      content: `
Hello **${username}**,

This is a private channel only visible to you, the bot and the server admins.

1. Visit [anonklub.xyz](https://anonklub.xyz) to generate a proof. Upon successful proof generation you'll be able to download an \`${config.proofAttachmentName}\` file.
2. Upload \`${config.proofAttachmentName}\` here in this private thread (plus sign >> upload a file).
3. Upon successful verification of your proof you'll be granted the *verified* role. 10s later, this private channel and your first message in <#${config.VERIFICATION_CHANNEL_ID}> will be deleted.`,
    })
    await interaction.reply({
      content: `Hello **${username}**, please check <#${privateChannel.id}> for further instructions.`,
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
