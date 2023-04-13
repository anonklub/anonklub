# Proving API

| Method | Route | Response   | Description                                               |
| ------ | ----- | ---------- | --------------------------------------------------------- |
| GET    | `/`   | `string[]` | List of addresses that have at least `min` balance of ETH |

## Getting Started - Develop

The BullMQ Job processor needs to be a compiled JS file so that it becomes a sandboxed job running in a separate thread... hence the preliminary build steps and `.prod` scripts.

1. Build `proving` and `shared` packages:

   ```bash
   lerna run build --scope '{@anonset/proving-api,@anonset/membership}'
   ```

2. Run the server:
   ```bash
   cd apis/proving && pnpm run server.prod
   ```
3. Run the client:

   ```bash
   cd apis/proving && pnpm run client.prod
   ```

## Deployment

Deployment process is manual at the moment:

1. Ensure the `.zkey`file is on the remote in `./apis/proving`
2. Ensure the branch you want to deploy is checked out on the remote.
3. `ssh ubuntu@<ip.ad.dr.ess> "cd workspace/e2e-zk-ecdsa/apis/prove/ && nohup npm run server >> log.txt 2>&1"`

Check log:
`ssh ubuntu@<ip.ad.dr.ess> "cat workspace/e2e-zk-ecdsa/apis/prove/log.txt"`
