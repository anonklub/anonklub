import { Events } from 'discord.js'
import { debug } from '~'
import { _Event } from './_Event'
import type { HandledEvent } from './interface'

export class Debug extends _Event {
	public name = Events.Debug as HandledEvent

	handleFn(info: string): void {
		debug(info)
	}
}
