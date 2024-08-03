import 'dotenv/config'
import { Events, GatewayIntentBits } from 'discord.js'
import { HandledEvent } from '../events/interface'

interface Config {
  auth: {
    header: string
    secret: string
  }

  BOT_TOKEN: string
  CLIENT_ID: string
  eventHandlerOn: Record<HandledEvent, boolean>
  GUILD_ID: string
  intents: GatewayIntentBits[]
  proofAttachmentName: string
  urls: {
    ui: string
  }
  VERIFICATION_CHANNEL_ID: string
  VERIFIED_ROLE_ID: string
}

const {
  AUTH_HEADER_NAME,
  BOT_TOKEN,
  CLIENT_ID,
  DISCORD_BOT_API_KEY,
  GUILD_ID,
  UI_URL,
  VERIFICATION_CHANNEL_ID,
  VERIFIED_ROLE_ID,
} = process.env
if (AUTH_HEADER_NAME === undefined) throw new Error('No AUTH_HEADER_NAME provided')
if (BOT_TOKEN === undefined) throw new Error('No BOT_TOKEN provided')
if (CLIENT_ID === undefined) throw new Error('No CLIENT_ID provided')
if (DISCORD_BOT_API_KEY === undefined) throw new Error('No DISCORD_BOT_API_KEY provided')
if (GUILD_ID === undefined) throw new Error('No GUILD_ID provided')
if (UI_URL === undefined) throw new Error('No UI_URL provided')
if (VERIFICATION_CHANNEL_ID === undefined) throw new Error('No VERIFICATION_CHANNEL_ID provided')
if (VERIFIED_ROLE_ID === undefined) throw new Error('No VERIFIED_ROLE_ID provided')

export const config: Config = {
  auth: {
    header: AUTH_HEADER_NAME,
    secret: DISCORD_BOT_API_KEY,
  },
  BOT_TOKEN,
  CLIENT_ID,
  eventHandlerOn: {
    [Events.ClientReady]: true,
    [Events.Debug]: false,
    [Events.Error]: true,
    [Events.InteractionCreate]: true,
    [Events.MessageCreate]: true,
  },
  GUILD_ID,
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  proofAttachmentName: 'anonklub-proof.bin',
  urls: { ui: UI_URL },
  VERIFICATION_CHANNEL_ID,
  VERIFIED_ROLE_ID,
}
