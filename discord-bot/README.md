# Discord Verification Bot

1. Discord admin defines their anonymity set. That is, the list of users that will be able to join the discord server.\
   Can use this [Query API server](https://query.anonklub.xyz/) to fetch anonymity sets based on different on chain
   criteria.
2. Compute merkle root and publish a
   corresponding [Verifier contract](../contracts/src/Verifier.sol)
3. Users generates proof of account ownership\
   Can use this [proving server API](http://anonklub.xyz:3000/) for development purposes.
4. Discord bot asks for these proofs and verifies them using the deployed Verifier contract

## Set Up

1. Create Bot in [Discord Developer Portal](https://discord.com/developers/applications)
2. Set Bot Permissions for Installation

   Scopes: application.commands, bot

   | Permission           | Reason                                                                                                 |
   | -------------------- | ------------------------------------------------------------------------------------------------------ |
   | Manage Channels      | Create a private verification per user and delete it after successful verification                     |
   | Manage messages      | Delete messages after successful verification for better privacy                                       |
   | Manage Roles         | Grant `verified` role                                                                                  |
   | Read Message History | Delete verification request message in public channel after successful verification for better privacy |
   | View Channels        | Need to be able to read user messages in order to handle verification requests                         |
   | Send Messages        | Communicate instructions and verification result to user                                               |

(Permissions integer: `2415922176`)

## Develop

1. Set environment variables (see [.env-sample](../.env-example)
2. Install deps: `pnpm --filter discord-bot start.dev`
