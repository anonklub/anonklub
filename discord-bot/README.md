# Discord Verification Bot

1. Discord admin defines their anonymity set. That is, the list of users that will be able to join the discord server.  
   Can use this [Query API server](https://anonset.fly.dev/) to fetch anonymity sets based on different on chain
   criteria.
2. Compute merkle root and publish a
   corresponding [Verifier contract](../contracts/src/Verifier.sol)
3. Users generates proof of account ownership  
   Can use this [proving server API](http://anonklub.xyz:3000/) for development purposes.
4. Discord bot asks for these proofs and verifies them using the deployed Verifier contract

## Set Up

### Bot Permissions for OAuth2 URL

| Section | Permission                  | Reason                                                                               |
| ------- | --------------------------- | ------------------------------------------------------------------------------------ |
| General | Manage Roles                | Grant `verified` role                                                                |
| General | Read Messages/View Channels | Need to be able to read user messages (proofs rawdata/file input) in order to handle |
| Text    | Send Messages               | Give feedback to user                                                                |
| Text    | Use Slash Commands          | Handle `/` commands                                                                  |

## Develop

0. Set environment variables (see [.env-sample](../.env-example)
1. Install deps: `pnpm --filter discord-bot start.dev`
