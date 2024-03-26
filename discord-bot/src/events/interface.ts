import type { Events } from 'discord.js'

export type HandledEvent =
	| Events.ClientReady
	| Events.Debug
	| Events.Error
	| Events.MessageCreate
	| Events.InteractionCreate

export enum ListeningMethod {
	Once = 'once',
	On = 'on',
}

export interface _EventI {
	bind: boolean
	listeningMethod: ListeningMethod
	name: HandledEvent
	handle: (...args: any[]) => void | Promise<void>
	init: () => void
}
