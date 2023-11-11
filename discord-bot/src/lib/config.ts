import 'dotenv/config'
import { Events, GatewayIntentBits } from 'discord.js'
import { HandledEvent } from '../events'

interface Config {
  addresses: {
    groth16Verifier: `0x${string}`
  }
  BOT_TOKEN: string
  CLIENT_ID: string
  DISCORD_REDIS_URL: string
  eventHandlerOn: Record<HandledEvent, boolean>
  GUILD_ID: string
  intents: GatewayIntentBits[]
  urls: {
    ui: string
  }
  VERIFICATION_CHANNEL_ID: string
  VERIFIED_ROLE_ID: string
}

const { BOT_TOKEN, CLIENT_ID, DISCORD_REDIS_URL, GUILD_ID } = process.env
if (BOT_TOKEN === undefined) throw new Error('No bot token provided')
if (CLIENT_ID === undefined) throw new Error('No client id provided')
if (GUILD_ID === undefined) throw new Error('No guild id provided')
if (DISCORD_REDIS_URL === undefined) throw new Error('No redis url provided')

export const config: Config = {
  addresses: {
    groth16Verifier: '0x893f293e3918a179bf87fb772206e9927db61b0c',
  },
  BOT_TOKEN,
  CLIENT_ID,
  DISCORD_REDIS_URL,
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
  urls: { ui: 'https://anonklub.fly.dev' },
  VERIFICATION_CHANNEL_ID: '1133394590318202942',
  VERIFIED_ROLE_ID: '1130886825087606924',
}
