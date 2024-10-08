import { debug } from '#/logger'
import { Events } from 'discord.js'
import { _Event } from './_Event'
import { HandledEvent } from './interface'

export class Debug extends _Event {
  public name = Events.Debug as HandledEvent

  handleFn(info: string): void {
    debug(info)
  }
}
