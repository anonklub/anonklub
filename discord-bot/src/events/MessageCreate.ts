import { config } from '#/config'
import { info } from '#/logger'
import { Attachment, Collection, Events, Message, PermissionFlagsBits, TextChannel } from 'discord.js'
import { _Event } from './_Event'
import { HandledEvent } from './interface'

const VERIFICATION_URL = `${config.urls.ui}/api/verify`
const DELETE_DELAY = 10_000

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

    info(`Fetching proof attachment uploaded by ${message.author.username}`)
    const proof = await this._handleProofBinaryAttachment(
      message.attachments,
    )

    info(`Posting ${message.author.username}'s binary proof at ${VERIFICATION_URL} for verification`)
    const res = await fetch(VERIFICATION_URL, {
      body: proof,
      headers: {
        [config.auth.header]: config.auth.secret,
        'Content-Type': 'application/octet-stream',
      },
      method: 'POST',
    })
    const { status, statusText } = res
    if (status !== 200) throw new Error(`${status} ${statusText}`)

    const valid = await res.json()
    if (valid === true) {
      if (message.member === null || message.member === undefined)
        throw new Error('No member found')

      await message.member.roles.add(config.VERIFIED_ROLE_ID)
      info(`Granted ${message.author.username} the verified role`)

      await message.channel.send({
        content:
          `Congrats **${message.author.username}**, you proof is valid ✅! You have been granted the *verified* role. This private channel will be deleted in 10s.`,
      })

      setTimeout(() => {
        ;(async () => {
          await message.channel.delete()

          const verificationChannel = message.guild?.channels.cache.get(
            config.VERIFICATION_CHANNEL_ID,
          )
          // TODO perform these checks once when initializing the bot?
          if (!(verificationChannel instanceof TextChannel)) throw new Error('No verification text channel found')
          const permissions = verificationChannel.permissionsFor(message.client.user)
          if (permissions === null) {
            throw new Error(
              `No permissions found for bot ${message.client.user.username} in #${verificationChannel.name}`,
            )
          }
          if (!permissions.has(PermissionFlagsBits.ReadMessageHistory)) {
            throw new Error(
              `Bot ${message.client.user.username} does not have permission to read message history in #${verificationChannel.name}`,
            )
          }

          const pastMessages = await verificationChannel.messages.fetch()
          const botMessage = pastMessages.find(
            (pastMessage: Message) =>
              pastMessage.author.id === config.CLIENT_ID
              && pastMessage.content.includes(
                message.author.username,
              ),
          )
          if (botMessage !== undefined) await botMessage.delete()
        })()
      }, DELETE_DELAY)
    } else {
      await message.channel.send({
        content:
          `Sorry **${message.author.username}**, your proof is invalid ❌. You have not been granted the *verified* role.`,
      })
    }
  }

  private async _handleProofBinaryAttachment(attachments: Collection<string, Attachment>) {
    const attachment = attachments.find((a) => a.name === config.proofAttachmentName)
    if (attachment === undefined)
      throw new Error(`No \`${config.proofAttachmentName}\` attachment in message`)

    return fetch(attachment.url).then(res => res.arrayBuffer())
  }
}
