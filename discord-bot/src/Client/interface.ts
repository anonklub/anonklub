import { Client as DiscordClient, TextChannel } from 'discord.js'
import { commands } from 'commands'
import { Events } from '../events'

export interface ClientI {
  commands: typeof commands
  discord: DiscordClient
  events: typeof Events
  verificationChannel: TextChannel

  init: () => Promise<ClientI>
  login: () => void
  stop: () => void
}
