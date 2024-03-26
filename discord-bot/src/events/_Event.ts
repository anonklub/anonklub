import { tryCatchReply } from '~'
import type { Client } from 'Client'
import { type _EventI, type HandledEvent, ListeningMethod } from './interface'

export abstract class _Event implements _EventI {
	bind = false
	listeningMethod = ListeningMethod.On
	abstract name: HandledEvent

	constructor(public client: Client) {}

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
