import { ErrorEmbed } from '#/ErrorEmbed'
import { ChatInputCommandInteraction, Message } from 'discord.js'
import { tryCatch } from './tryCatch'

export const tryCatchReply = tryCatch(
  async (err: Error, arg: ChatInputCommandInteraction | Message) => {
    const isMessage = arg instanceof Message
    const embeds = [
      new ErrorEmbed({
        description: `Error while handling your ${isMessage ? 'message' : 'slash command'}`,
        details: err.message,
      }),
    ]

    if (isMessage) {
      await arg.channel.send({
        embeds,
      })
    } else {
      if (!arg.isCommand()) return

      const action = arg.replied ? 'followUp' : 'reply'
      await arg[action]({
        embeds,
      })
    }
  },
)
