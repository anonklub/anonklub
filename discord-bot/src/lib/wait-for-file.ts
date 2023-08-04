import { CommandInteraction, Message } from 'discord.js'
import { readFileSync } from 'fs'

export const waitForJsonFile =
  (name: string) => async (interaction: CommandInteraction) => {
    const { channel } = interaction
    if (channel === null || channel === undefined)
      throw new Error('No channel found')

    const filter = (msg: Message) =>
      msg.author.id === interaction.user.id && msg.attachments.size > 0
    const options = { errors: ['time'], max: 1, time: 60000 }
    const messages = await channel.awaitMessages({
      filter,
      ...options,
    })

    const message = messages.first()

    if (message === undefined)
      throw new Error('No file uploaded in time (within 60s)')

    const attachment = message.attachments.first()

    if (attachment === undefined) throw new Error('No attachment in message')

    if (attachment.name !== name)
      throw new Error(`File with wrong file name uploaded (expecting ${name})`)

    const fileDataString = readFileSync(attachment.url).toString()
    return JSON.parse(fileDataString)
  }

export const waitForProofJsonFile = waitForJsonFile('proof.json')
export const waitForPublicJsonFile = waitForJsonFile('public.json')
