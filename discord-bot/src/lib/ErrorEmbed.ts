import { Colors, EmbedBuilder } from 'discord.js'

export class ErrorEmbed extends EmbedBuilder {
  constructor({
    description,
    details,
  }: {
    description: string
    details: string
  }) {
    super()
    this.setColor(Colors.Red)
    this.setTitle('Error')
    this.setDescription(description)
    this.setTimestamp()
    this.setFooter({ text: 'Try again later' })
    this.addFields({
      name: 'Error Details',
      value: details,
    })
  }
}
