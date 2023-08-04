import { CommandInteraction, TextChannel } from 'discord.js'
import { config } from '../config'

export function inVerificationChannel(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value

  descriptor.value = async function (
    interaction: CommandInteraction,
  ): Promise<void> {
    const channel = interaction.guild?.channels.cache.get(
      config.VERIFICATION_CHANNEL_ID,
    )
    if (channel?.id !== config.VERIFICATION_CHANNEL_ID) return
    if (!(channel instanceof TextChannel)) return

    await originalMethod.call(this, interaction)
  }

  return descriptor
}
