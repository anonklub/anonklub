import type { Client as DiscordClient } from 'discord.js'
import type { commands } from 'commands'
import type { Events } from '../events'

export interface ClientI {
	commands: typeof commands
	discord: DiscordClient
	events: typeof Events
	init: () => Promise<ClientI>
	login: () => void
	stop: () => void
}
