import { config } from '#/config'
import { verifyOnChain } from '#/verify-onchain'
import { Attachment, Collection, Events, Message, TextChannel } from 'discord.js'
import { _Event } from './_Event'
import { HandledEvent } from './interface'

export class MessageCreate extends _Event {
  override bind = true
  name = Events.MessageCreate as HandledEvent

  async handleFn(message: Message) {
    if (message.author.bot) return
    const channelId = message.channel.id
    const channel = await message.guild?.channels.fetch(channelId)
    const channelName = channel?.name
    if (channelName !== `private-verify-${message.author.username}`) return
    if (message.attachments.size === 0) return

    const { proof, publicSignals } = await this._handleAttachments(
      message.attachments,
    )

    // FIXME: isn't viem supposed to give the typings automagically from the JSON ABIs?
    const valid: boolean = await verifyOnChain({
      // FIXME
      // @ts-expect-error
      proof,
      // FIXME
      // @ts-expect-error
      publicSignals,
    })

    if (valid) {
      if (message.member === null || message.member === undefined)
        throw new Error('No member found')
      await message.member.roles.add(config.VERIFIED_ROLE_ID)
      await message.channel.send({
        content:
          `Congrats \`${message.author.username}\`, you proof is valid ✅! You have been granted the verified role. This private channel will be deleted in 10s.`,
      })

      setTimeout(() => {
        ;(async () => {
          await message.channel.delete()

          const verificationChannel = message.guild?.channels.cache.get(
            config.VERIFICATION_CHANNEL_ID,
          ) as TextChannel
          const pastMessages = await verificationChannel.messages.fetch()
          const botMessage = pastMessages.find(
            (pastMessage: Message) =>
              pastMessage.author.id === config.CLIENT_ID
              && pastMessage.content.includes(
                `Hello \`${message.author.username}\`, please check #private-verify-${message.author.username} for further instructions.`,
              ),
          )
          if (botMessage !== undefined) await botMessage.delete()
        })().catch((err) => {
          console.error(err)
        })
      }, 10000)
    } else {
      await message.channel.send({
        content:
          `Sorry \`${message.author.username}\`, your proof is invalid ❌. You have not been granted the verified role.`,
      })
    }
  }

  private async _handleAttachments(
    attachments: Collection<string, Attachment>,
  ) {
    const [proof, publicSignals] = await Promise.all(
      ['proof.json', 'public.json'].map(async (name) => this._handleJsonAttachment({ attachments, name })),
    )

    return {
      proof,
      publicSignals,
    }
  }

  private async _handleJsonAttachment({
    attachments,
    name,
  }: {
    attachments: Collection<string, Attachment>
    name: string
  }) {
    const attachment = attachments.find((a) => a.name === name)
    if (attachment === undefined)
      throw new Error(`No ${name} attachment in message`)

    return fetch(attachment.url).then(async (res) => res.json())
  }
}
