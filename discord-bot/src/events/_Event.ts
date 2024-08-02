import { tryCatchReply } from '#/decorators'
import { commands } from 'commands'
import { Client as DiscordClient } from 'discord.js'
import { _EventI, HandledEvent, ListeningMethod } from './interface'

export abstract class _Event implements _EventI {
  bind = false
  listeningMethod = ListeningMethod.On
  abstract name: HandledEvent

  constructor(public client: { commands: typeof commands; discord: DiscordClient }) {}

  @tryCatchReply
  async handle(...args: any[]) {
    return this.handleFn(...args)
  }

  protected abstract handleFn(...args: any[]): void | Promise<void>

  init() {
    this.client.discord[this.listeningMethod](
      this.name,
      this.bind ? this.handle.bind(this) : this.handle,
    )
  }
}
