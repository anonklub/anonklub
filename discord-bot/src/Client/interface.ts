import { commands } from 'commands'
import { Client as DiscordClient } from 'discord.js'
import { Events } from '../events/Events'

export interface ClientI {
  commands: typeof commands
  discord: DiscordClient
  events: typeof Events
  init: () => Promise<ClientI>
  login: () => void
  stop: () => void
}
