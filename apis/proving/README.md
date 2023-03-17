# Proving API

| Method | Route | Response   | Description                                               |
| ------ | ----- | ---------- | --------------------------------------------------------- |
| GET    | `/`   | `string[]` | List of addresses that have at least `min` balance of ETH |

## Getting Started - Develop

TODO

## Deployment

Deployment process is manual at the moment:

1. Ensure the `.zkey`file is on the remote in `./apis/proving`
2. Ensure the branch you want to deploy is checked out on the remote.
3. `ssh ubuntu@<ip.ad.dr.ess> "cd workspace/e2e-zk-ecdsa/apis/proving/ && nohup npm run server >> log.txt 2>&1"`

Check log:
`ssh ubuntu@<ip.ad.dr.ess> "cat workspace/e2e-zk-ecdsa/apis/proving/log.txt"`
