import { inVerificationChannel, tryCatchReply } from '#/decorators'
import { isMatchingCommand } from '#/decorators/isMatchingCommand'
import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { _CommandI } from './interface'

export abstract class _Command implements _CommandI {
  public abstract commandBuilder: Omit<
    SlashCommandBuilder,
    'addSubcommand' | 'addSubcommandGroup'
  >

  @isMatchingCommand
  @inVerificationChannel
  @tryCatchReply
  async handle(interaction: CommandInteraction) {
    return this.handleFn(interaction)
  }

  protected abstract handleFn(
    interaction: CommandInteraction,
  ): void | Promise<void>
}
