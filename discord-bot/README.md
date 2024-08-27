# Discord Verification Bot

## Set Up

1. Create Bot in [Discord Developer Portal](https://discord.com/developers/applications)
2. Set Bot Permissions for Installation

   Scopes: application.commands, bot

   | Permission           | Reason                                                                                                 |
   | -------------------- | ------------------------------------------------------------------------------------------------------ |
   | Manage Channels      | Create a private verification per user and delete it after successful verification                     |
   | Manage Messages      | Delete messages after successful verification for better privacy                                       |
   | Manage Roles         | Grant `verified` role                                                                                  |
   | Read Message History | Delete verification request message in public channel after successful verification for better privacy |
   | Send Messages        | Communicate instructions and verification result to user                                               |
   | View Channels        | Need to be able to read user messages in order to handle verification requests                         |

(Permissions integer: `2415922176`)

## Develop

1. Set environment variables (see [.env-sample](../.env-example)
2. Install deps: `pnpm --filter discord-bot start.dev`
