import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { inVerificationChannel, isMatchingCommand, tryCatchReply } from '~'
import { UsersRepository } from '../UsersRepository'
import { _CommandI } from './interface'

export abstract class _Command implements _CommandI {
  public abstract commandBuilder: Omit<
    SlashCommandBuilder,
    'addSubcommand' | 'addSubcommandGroup'
  >

  constructor(public users: UsersRepository) {}

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
