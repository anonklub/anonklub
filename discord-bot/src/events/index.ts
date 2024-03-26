import { Events as DiscordEvents } from 'discord.js'
import { config } from '~'
import { ClientReady } from './ClientReady'
import { Debug } from './Debug'
import { Error } from './Error'
import { InteractionCreate } from './InteractionCreate'
import { HandledEvent } from './interface'
import { MessageCreate } from './MessageCreate'

export * from './_Event'
export * from './interface'

type EventClass =
	| typeof ClientReady
	| typeof Debug
	| typeof InteractionCreate
	| typeof MessageCreate
	| typeof Error

const EventsClasses = {
	[DiscordEvents.ClientReady]: ClientReady,
	[DiscordEvents.Debug]: Debug,
	[DiscordEvents.Error]: Error,
	[DiscordEvents.InteractionCreate]: InteractionCreate,
	[DiscordEvents.MessageCreate]: MessageCreate,
}
const Events: Map<DiscordEvents, EventClass> = new Map()
Object.entries(EventsClasses).forEach(([eventName, EventClass]) => {
	if (config.eventHandlerOn[eventName as HandledEvent]) {
		Events.set(eventName as DiscordEvents, EventClass)
	}
})

export { Events }
// Events.set(DiscordEvents.ClientReady, ClientReady)
// Events.set(DiscordEvents.Debug, Debug)
// Events.set(DiscordEvents.InteractionCreate, InteractionCreate)
// Events.set(DiscordEvents.MessageCreate, MessageCreate)
