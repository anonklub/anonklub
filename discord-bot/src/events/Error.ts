import { Events } from 'discord.js'
import { error } from '~'
import { _Event } from './_Event'
import { HandledEvent } from './interface'

export class Error extends _Event {
	public name = Events.Error as HandledEvent

	handleFn(err: Error): void {
		error(err)
	}
}
